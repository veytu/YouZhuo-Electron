import { useEffect, useState } from 'react';
import './index.css'
import { FC } from 'react';
import { VideoRenderer } from './renderer';
import { useRtcEngine } from './hooks';
import { listenChannelMessage, sendToRendererProcess } from '@classroom/infra/utils/ipc';
import { ChannelType, IPCMessageType } from '@classroom/infra/utils/ipc-channels';
import { RtcEngineContext } from './context';
import { WindowID } from '@classroom/infra/api';
import { SvgIconEnum, SvgImg } from '@classroom/ui-kit';
type Props = {
  //
};
export const ExpandPlayer: FC<Props> = () => {
  const { rtcEngine } = useRtcEngine();
  const [info, setInfo] = useState({
    uid: undefined as number | undefined,
    isLocal: false,
    isMirrorMode: false,
  });
  useEffect(() => {
    const dispose = listenChannelMessage(ChannelType.Message, (_e, message) => {
      console.log('message: ', message);
      if (message.type === 'teacherStreamUpdated') {
        const { streamUuid, isLocal, isMirrorMode } = message.payload as {
          streamUuid: string;
          isLocal: boolean;
          isMirrorMode: boolean;
        };
        setInfo({
          uid: +streamUuid,
          isLocal: isLocal ?? false,
          isMirrorMode: isMirrorMode ?? false,
        });
      }
    });
    console.log('send message');
    //
    sendToRendererProcess(WindowID.Main, ChannelType.Message, {
      type: 'getTeacherStream',
    });
    return dispose;
  }, []);
  return (
    <RtcEngineContext.Provider value={{ rtcEngine }}>
      {typeof info.uid === 'number' && (
        <VideoRenderer uid={info.uid} isLocal={info.isLocal} isMirrorMode={info.isMirrorMode} />
      )}
    </RtcEngineContext.Provider>
  );
};

export const ExpandPlayerGrid: FC<Props> = () => {
  const { rtcEngine } = useRtcEngine();
  const [showPageData,setShowPageData] = useState({
    currentPage: 0,//当前页
    rows: 2,//宫格行数
    columns: 2,//宫格列数
    showList: [],//当前显示数据的列表
    maxShowGridCount: 4,//最大显示的宫格数量
    haveNext: false,//是否还有下一页
  })
  useEffect(() => {
    const dispose = listenChannelMessage(ChannelType.Message, (_e, message) => {
      console.log('message: ', message);
      if (message.type === 'allStreamUpdated') {
        //@ts-ignore
        setShowPageData(JSON.parse(message.payload))
      }
    });
    console.log('send message');
    //
    sendToRendererProcess(WindowID.Main, ChannelType.Message, {
      type: 'getAllShowStream',
    });
    return dispose;
  }, []);

  //跳转到下一页
  const goNextPage = ()=>{
    sendToRendererProcess(WindowID.Main, ChannelType.Message, {
      type: 'allShowStreamToNext',
    });
  }
   //跳转到上一页
   const goLastPage = ()=>{
    sendToRendererProcess(WindowID.Main, ChannelType.Message, {
      type: 'allShowStreamToLast',
    });
   }

  return (
    <RtcEngineContext.Provider value={{ rtcEngine }}>
      <div style={{position:'relative'}}>
        <div className="expand-play-grid-container" style={{ gridTemplateColumns: `repeat(${showPageData.columns}, 1fr)`, gridTemplateRows: `repeat(${showPageData.rows}, 1fr)` }}>
          {showPageData.showList.map((info: ShowInfo, index) => (
            info.streamUuid != null && (
              <div key={index} className='expand-play-grid-item' style={{ width: 100 / showPageData.columns + 'vw', height: 100 / showPageData.rows + "vh" }}>
                <VideoRenderer uid={+info.streamUuid} isLocal={info.isLocal} isMirrorMode={info.isMirrorMode} streamType={showPageData.maxShowGridCount <= 4 ? 0 : 1} />
              </div>
            )
          ))}
        </div>
        <div className='expand-play-go-other-page expand-play-go-last-page' onClick={goLastPage} style={{display:showPageData.currentPage > 0 ? 'unset' : 'none'}}>
          <SvgImg type={SvgIconEnum.FCR_LEFT} />
        </div>
        <div className='expand-play-go-other-page expand-play-go-next-page' onClick={goNextPage} style={{ display: showPageData.haveNext ? 'unset' : 'none' }}>
          <SvgImg type={SvgIconEnum.FCR_RIGHT} />
        </div>
      </div>
    </RtcEngineContext.Provider>
  );
};

class ShowInfo{
  streamUuid: number | undefined;
  isLocal: false = false;
  isMirrorMode: false = false;
}