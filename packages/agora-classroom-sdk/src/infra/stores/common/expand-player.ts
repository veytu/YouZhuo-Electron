import { WindowID } from '@classroom/infra/api';
import {
  listenChannelMessage,
  sendToRendererProcess,
  transmitRTCRawData,
} from '@classroom/infra/utils/ipc';
import { ChannelType, IPCMessageType } from '@classroom/infra/utils/ipc-channels';
import { EduRteEngineConfig, EduRteRuntimePlatform } from 'agora-edu-core';
import { action, observable, reaction } from 'mobx';
import { EduUIStoreBase } from './base';
export class ExpandPlayerUIStore extends EduUIStoreBase {
  private _disposers: (() => void)[] = [];
  @observable
  private _isPlayerOpened = false;
  private _transmitUids: Set<number> = new Set();
  @action.bound
  openWindow() {
    this.shareUIStore.moveWindowAlignToWindow(WindowID.ExpandPlayer, WindowID.Main, {
      horizontal: 'center',
    });
    this.shareUIStore.showWindow(WindowID.ExpandPlayer);
    this._isPlayerOpened = true;
  }
  @action.bound
  closeWindow() {
    this.shareUIStore.hideWindow(WindowID.ExpandPlayer);
    this._isPlayerOpened = false;
  }
  private _rtcRawDataCallback = (info: unknown) => {
    // filter out raw data captured from local
    let rawArr = info as { uid: number }[];
    if (this._transmitUids) {
      rawArr = rawArr.filter(({ uid }) => this._transmitUids.has(uid));
    }
    if (rawArr.length) {
      transmitRTCRawData(WindowID.ExpandPlayer, rawArr);
    }
  };
  private _updatePlayerInfo() {
    const stream = this.getters.teacherCameraStream;
    console.log(`alex-extend-update-${JSON.stringify(stream)}- isLocal - ${stream.isLocal}`);
    sendToRendererProcess(WindowID.ExpandPlayer, ChannelType.Message, {
      type: 'teacherStreamUpdated',
      payload: {
        streamUuid: stream?.streamUuid,
        isLocal: stream?.isLocal,
        isMirrorMode: stream?.isLocal ? this.classroomStore.mediaStore.isMirror : false,
      },
    });
  }
  onInstall() {
    // alex-tag-window-config
    if (EduRteEngineConfig.platform === EduRteRuntimePlatform.Electron) {
      this.shareUIStore.openWindow(WindowID.ExpandPlayer, {
        options: {
          width: 600,
          height: 360,
          minWidth: 600,
          minHeight: 360,
          fullscreen: true,
          show: false,
          allowRendererProcessReuse: false,
          preventClose: true,
        },
      });
      this._disposers.push(
        reaction(
          () => this._isPlayerOpened,
          (opened) => {
            if (opened) {
              //@ts-ignore
              this.classroomStore.connectionStore.scene.rtcChannel._adapter.base.rtcEngine.on(
                'agoraVideoRawData',
                this._rtcRawDataCallback,
              );
            } else {
              //@ts-ignore
              this.classroomStore.connectionStore.scene.rtcChannel._adapter.base.rtcEngine.off(
                'agoraVideoRawData',
                this._rtcRawDataCallback,
              );
            }
          },
        ),
      );
      this._disposers.push(
        listenChannelMessage(ChannelType.Message, (event, message) => {
          if (message.type === 'getTeacherStream') {
            this._updatePlayerInfo();
          }
          if (message.type === IPCMessageType.BrowserWindowClose) {
            const { payload } = message as { payload: any };
            if (payload === WindowID.ExpandPlayer) {
              this.closeWindow();
            }
          }
        }),
      );
      this._disposers.push(
        reaction(
          () => this.getters.teacherCameraStream,
          () => {
            if (this.getters.teacherCameraStream?.isLocal) {
              this._transmitUids.add(0);
            } else {
              this._transmitUids.add(+this.getters.teacherCameraStream.streamUuid);
            }
            this._updatePlayerInfo();
          },
        ),
      );
    }
  }
  onDestroy() {
    if (EduRteEngineConfig.platform === EduRteRuntimePlatform.Electron) {
      //@ts-ignore
      this.classroomStore.connectionStore.scene?.rtcChannel._adapter.base.rtcEngine.off(
        'agoraVideoRawData',
        this._rtcRawDataCallback,
      );
    }
    this._disposers.forEach((d) => d());
    this._disposers = [];
  }
}
