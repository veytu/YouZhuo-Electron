import { Scenarios } from '@proctor/infra/capabilities/scenarios';
import {
  AgoraEduClassroomEvent,
  EduClassroomConfig,
  EduEventCenter,
  EduMediaEncryptionMode,
  EduRegion,
  EduRoleTypeEnum,
  EduRoomTypeEnum,
  Platform,
  AgoraCloudProxyType,
} from 'agora-edu-core';
import { ApiBase, Logger, useHLS } from 'agora-rte-sdk';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { render, unmountComponentAtNode } from 'react-dom';
import { EduContext } from '../contexts';
import {
  applyTheme,
  loadTheme,
  loadUIConfig,
  supportedRoomTypes,
  themes,
  uiConfigs,
} from '../utils/config-loader';

import 'antd/dist/antd.css';
import './polyfills';
import { Providers } from './providers';
import {
  BoardWindowAnimationOptions,
  ConfigParams,
  ConvertMediaOptionsConfig,
  LaunchMediaOptions,
  LaunchOption,
} from './type';
import { addResourceBundle, changeLanguage } from 'agora-common-libs';
import { en } from '@proctor/ui-kit/utilities/translate/en';
import { zh } from '@proctor/ui-kit/utilities/translate/zh';
import { FcrMultiThemeMode, FcrTheme, FcrUIConfig } from 'agora-common-libs';
import { AgoraCloudClassWidget as AgoraWidgetBase } from 'agora-common-libs';
import '@proctor/ui-kit/styles/global.css';
import HLS from 'hls.js';
import { isLocked, lock, unlock } from './lock';
export * from './type';
export class AgoraProctorSDK {
  private static _config: any = {};
  private static _widgets: Record<string, typeof AgoraWidgetBase> = {};
  private static _boardWindowAnimationOptions: BoardWindowAnimationOptions = {};
  private static _language: string;
  private static _appId = '';
  private static _uiConfig: FcrUIConfig;
  private static _theme: FcrTheme;
  private static _shareUrl: string;
  //default use GLOBAL region(including CN)
  private static region: EduRegion = EduRegion.CN;
  private static _checkStudentScreenShareState?: boolean = true;
  private static _cloudProxy?: AgoraCloudProxyType;
  private static _convertRegion(region: string): EduRegion {
    switch (region) {
      case 'CN':
        return EduRegion.CN;
      case 'AP':
        return EduRegion.AP;
      case 'EU':
        return EduRegion.EU;
      case 'NA':
        return EduRegion.NA;
    }
    return region as EduRegion;
  }
  private static _convertMediaOptions(opts?: LaunchMediaOptions): ConvertMediaOptionsConfig {
    const config: ConvertMediaOptionsConfig = {
      web: {
        codec: 'h264',
      },
    };

    if (opts) {
      const {
        cameraEncoderConfiguration,
        screenShareEncoderConfiguration,
        encryptionConfig,
        lowStreamCameraEncoderConfiguration,
        channelProfile,
        web,
      } = opts;

      if (cameraEncoderConfiguration) {
        config.defaultCameraEncoderConfigurations = {
          ...cameraEncoderConfiguration,
        };
      }
      if (screenShareEncoderConfiguration) {
        config.defaultScreenEncoderConfigurations = {
          ...screenShareEncoderConfiguration,
        };
      }
      if (encryptionConfig) {
        config.encryption = {
          mode: encryptionConfig.mode as unknown as EduMediaEncryptionMode,
          key: encryptionConfig.key,
        };
      }
      if (lowStreamCameraEncoderConfiguration) {
        config.defaultLowStreamCameraEncoderConfigurations = {
          ...lowStreamCameraEncoderConfiguration,
        };
      }
      if (typeof channelProfile !== 'undefined') {
        config.channelProfile = channelProfile;
      }
      if (web) {
        config.web = web;
      }
    }
    return config;
  }

  static setParameters(params: string) {
    const { host, uiConfigs, themes } = JSON.parse(params) || {};

    if (host) {
      this._config.host = host;
    }

    if (uiConfigs) {
      Object.keys(uiConfigs).forEach((k) => {
        loadUIConfig(parseInt(k), uiConfigs[k]);
      });
    }

    if (themes) {
      Object.keys(themes).forEach((k) => {
        loadTheme(k, themes[k]);
      });
    }
  }

  static getLoadedScenes() {
    return supportedRoomTypes.map((roomType) => {
      const name = uiConfigs[roomType].name ?? '';

      return {
        name,
        roomType,
      };
    });
  }

  static config(config: ConfigParams) {
    this._appId = config.appId;
    if (config.region) {
      this.region = this._convertRegion(config.region);
    }
  }

  static get widgets() {
    return this._widgets || {};
  }

  static get boardWindowAnimationOptions(): BoardWindowAnimationOptions {
    return this._boardWindowAnimationOptions || {};
  }

  static get language() {
    return this._language || 'en';
  }

  static get uiConfig() {
    return this._uiConfig;
  }

  static get theme() {
    return this._theme;
  }

  static get shareUrl() {
    return this._shareUrl;
  }
  static get checkStudentScreenShareState() {
    return this._checkStudentScreenShareState;
  }

  static get cloudProxy() {
    return this._cloudProxy;
  }

  private static _validateOptions(option: LaunchOption) {
    const isInvalid = (value: string) => value === undefined || value === null || value === '';

    if (!option) {
      throw new Error('AgoraProctorSDK: LaunchOption is required!');
    } else if (
      ![
        EduRoleTypeEnum.assistant,
        EduRoleTypeEnum.invisible,
        EduRoleTypeEnum.none,
        EduRoleTypeEnum.student,
        EduRoleTypeEnum.teacher,
        EduRoleTypeEnum.observer,
      ].includes(option.roleType)
    ) {
      throw new Error('AgoraProctorSDK: Invalid roleType!');
    } else if (
      ![
        EduRoomTypeEnum.Room1v1Class,
        EduRoomTypeEnum.RoomBigClass,
        EduRoomTypeEnum.RoomSmallClass,
        EduRoomTypeEnum.RoomProctor,
      ].includes(option.roomType)
    ) {
      throw new Error('AgoraProctorSDK: Invalid roomType!');
    } else if (isInvalid(option.userName)) {
      throw new Error('AgoraProctorSDK: userName is required');
    } else if (isInvalid(option.userUuid)) {
      throw new Error('AgoraProctorSDK: userUuid is required');
    } else if (isInvalid(option.roomName)) {
      throw new Error('AgoraProctorSDK: roomName is required');
    } else if (isInvalid(option.roomUuid)) {
      throw new Error('AgoraProctorSDK: roomUuid is required');
    } else if (
      typeof option.rtcCloudProxyType !== 'undefined' &&
      ![AgoraCloudProxyType.Automatic, AgoraCloudProxyType.TCP, AgoraCloudProxyType.UDP]
    ) {
      throw new Error(`AgoraEduSDK: ${option.rtcCloudProxyType} is not valid value for cloudProxy`);
    }
  }

  static launch(dom: HTMLElement, option: LaunchOption) {
    if (isLocked()) {
      Logger.error(
        '[AgoraProctorSDK]failed to launch as you have already launched a proctor, you need to destory it by call the function returned by the launch method before you relaunch it',
      );
      return () => {
        /** noop */
      };
    }
    EduContext.reset();
    useHLS(HLS);
    this._validateOptions(option);
    const {
      pretest,
      userUuid,
      userName,
      roleType,
      rtmToken,
      roomUuid,
      roomName,
      roomType,
      duration,
      platform = Platform.PC,
      startTime,
      uiMode,
      shareUrl,
      checkStudentScreenShareState,
    } = option;
    const sessionInfo = {
      userUuid,
      userName,
      role: roleType,
      roomUuid,
      roomName,
      roomType,
      duration,
      flexProperties: {},
      token: rtmToken,
      startTime,
    };

    this._shareUrl = shareUrl || '';
    this._language = option.language;
    this._checkStudentScreenShareState = checkStudentScreenShareState === false ? false : true;
    this._widgets = {
      ...option.widgets,
    };

    changeLanguage(option.language);

    const config = new EduClassroomConfig(
      this._appId,
      sessionInfo,
      '',
      {
        region: this.region,
        rtcConfigs: {
          ...this._convertMediaOptions(option.mediaOptions),
          ...{
            noDevicePermission: roleType === EduRoleTypeEnum.invisible,
          },
        },
        rtcCloudProxyType: option.rtcCloudProxyType,
        rtmCloudProxyEnabled: option.rtmCloudProxyEnabled,
      },
      platform,
      {
        openCameraDeviceAfterLaunch: pretest,
        openRecordingDeviceAfterLaunch: pretest,
      },
    );

    if (this._config.host) {
      config.host = this._config.host;
    }

    config.ignoreUrlRegionPrefix = ['dev', 'pre'].some((v) =>
      this._config.host ? this._config.host.includes(v) : false,
    );

    EduClassroomConfig.setConfig(config);

    EduEventCenter.shared.onClassroomEvents((event: AgoraEduClassroomEvent) => {
      if (event === AgoraEduClassroomEvent.Destroyed) {
        unmountComponentAtNode(dom);
      }
    });

    EduEventCenter.shared.onClassroomEvents(option.listener);

    const themeMode = uiMode ?? FcrMultiThemeMode.light;
    this._selectUITheme(themeMode, option.roomType);
    applyTheme(this._theme);

    addResourceBundle('en', en);
    addResourceBundle('zh', zh);

    render(
      <Providers language={option.language} uiConfig={this.uiConfig} theme={this.theme}>
        <Scenarios pretest={pretest} roomType={sessionInfo.roomType} />
      </Providers>,
      dom,
    );
    lock();
    return () => {
      unmountComponentAtNode(dom);
      unlock();
    };
  }

  private static _selectUITheme(uiMode: FcrMultiThemeMode, roomType: EduRoomTypeEnum) {
    const themeMode = uiMode ?? FcrMultiThemeMode.light;
    // this._uiConfig = uiConfigs[roomType];
    this._theme = themes['default'][themeMode];
  }

  static setRecordReady() {
    const {
      rteEngineConfig: { ignoreUrlRegionPrefix, region },
      sessionInfo: { roomUuid },
      appId,
    } = EduClassroomConfig.shared;
    const pathPrefix = `${
      ignoreUrlRegionPrefix ? '' : '/' + region.toLowerCase()
    }/edu/apps/${appId}`;
    new ApiBase().fetch({
      path: `/v2/rooms/${roomUuid}/records/ready`,
      method: 'PUT',
      pathPrefix,
    });
  }
}

dayjs.extend(duration);
