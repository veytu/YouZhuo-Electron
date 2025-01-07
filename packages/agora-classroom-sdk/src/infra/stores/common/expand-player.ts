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
  private showPageListInfo = {
    currentPage:0,//当前页
    rows:2,//宫格行数
    columns:2,//宫格列数
    showList:[{}],//当前显示数据的列表
    maxShowGridCount:4,//最大显示的宫格数量
    haveNext:false,//是否还有下一页
  };//当前页
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
    console.log(`alex-extend-update-${stream ? JSON.stringify(stream) : 'null'}- isLocal - ${stream ? stream.isLocal : ''}`);
    if(stream){
      sendToRendererProcess(WindowID.ExpandPlayer, ChannelType.Message, {
        type: 'teacherStreamUpdated',
        payload: {
          streamUuid: stream?.streamUuid,
          isLocal: stream?.isLocal,
          isMirrorMode: stream?.isLocal ? this.classroomStore.mediaStore.isMirror : false,
        },
      });
    }
  }
  private _updateAllShowPlayerInfo() {
    //所有的数据列表
    const allStreamList = []
    //添加老师
    if(this.getters.teacherCameraStream){
      allStreamList.push(this.getters.teacherCameraStream)
    }
    //添加自己，如果学生里面有自己的话
    const mySelftList = this.getters.studentCameraStreams.filter(item => item.isLocal)
    if (mySelftList && mySelftList.length > 0) {
      allStreamList.push(mySelftList[0])
    }
    //添加其他的人
    const otherList = this.getters.studentCameraStreams.filter(item => !item.isLocal)
    if (otherList && otherList.length > 0) {
      allStreamList.push(...otherList)
    }
    //最大数量设置
    // eslint-disable-next-line prefer-const
    let { maxShowGridCount, currentPage, columns, rows,haveNext } = this.showPageListInfo;
    //@ts-ignore
    maxShowGridCount = Number(sessionStorage.getItem('maxGridCount'))
    //根据最大数量做行列处理
    if(currentPage === 0){
      //当前数量
      const allListSize = allStreamList.length;
      //未达到最大数量做行列最大处理
      if (columns * rows < maxShowGridCount) {
        if (maxShowGridCount === 4) {
          rows = 2;
          columns = 2;
        } else if (maxShowGridCount === 6) {
          rows = 2;
          columns = 3;
        } else if (maxShowGridCount === 9) {
          rows = 3;
          columns = 3;
        }
      }
      if (allListSize < maxShowGridCount) {
        if (allListSize <= 4) {
          rows = 2;
          columns = 2;
        } else if (allListSize <= 6) {
          rows = 2;
          columns = 3;
        } else {
          rows = 3;
          columns = 3;
        }
      }
    }
    if((currentPage - 1) * columns * rows > allStreamList.length){
      currentPage = currentPage - 1;
    }
    const currentList = allStreamList.slice(currentPage * columns * rows, Math.min((currentPage + 1) * columns * rows, allStreamList.length))
    haveNext = currentPage * columns * rows >= allStreamList.length;
    this.showPageListInfo = {
      ...this.showPageListInfo, maxShowGridCount, currentPage, columns, rows, haveNext, showList: currentList.map(stream => {
        return {
          streamUuid: stream?.streamUuid,
          isLocal: stream?.isLocal,
          isMirrorMode: stream?.isLocal ? this.classroomStore.mediaStore.isMirror : false,
        }
      })
    }

    sendToRendererProcess(WindowID.ExpandPlayer, ChannelType.Message, {
      type: 'allStreamUpdated',
      payload: JSON.stringify(this.showPageListInfo)
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
          if (message.type === 'getAllShowStream') {
            this._updateAllShowPlayerInfo();
          }
          if (message.type === 'allShowStreamToNext') {
            this.showPageListInfo.currentPage = this.showPageListInfo.currentPage + 1;
            this._updateAllShowPlayerInfo();
          }
          if (message.type === 'allShowStreamToLast') {
            this.showPageListInfo.currentPage = Math.max(0, this.showPageListInfo.currentPage - 1);
            this._updateAllShowPlayerInfo();
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
          () => [this.getters.teacherCameraStream,this.getters.studentCameraStreams],
          () => {
            this._transmitUids.clear()
            this._updateAllShowPlayerInfo()
            this.showPageListInfo.showList.forEach(stream => {
              if (stream) {
                //@ts-ignore
                if (stream?.isLocal) {
                  this._transmitUids.add(0);
                } else {
                  //@ts-ignore
                  this._transmitUids.add(+stream.streamUuid);
                }
              }
            });
            this._updatePlayerInfo();
            this._updateAllShowPlayerInfo();
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
