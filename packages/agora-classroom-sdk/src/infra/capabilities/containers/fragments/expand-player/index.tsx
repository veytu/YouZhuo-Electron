import { useEffect, useState } from 'react';
import './index.css'
import { FC } from 'react';
import { VideoRenderer } from './renderer';
import { useRtcEngine } from './hooks';
import { listenChannelMessage, sendToRendererProcess } from '@classroom/infra/utils/ipc';
import { ChannelType, IPCMessageType } from '@classroom/infra/utils/ipc-channels';
import { RtcEngineContext } from './context';
import { WindowID } from '@classroom/infra/api';
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
  const [showList,setShowList] = useState([])
  useEffect(() => {
    const dispose = listenChannelMessage(ChannelType.Message, (_e, message) => {
      console.log('message: ', message);
      if (message.type === 'allStreamUpdated') {
        //@ts-ignore
        setShowList(message.payload)
      }
    });
    console.log('send message');
    //
    sendToRendererProcess(WindowID.Main, ChannelType.Message, {
      type: 'getAllShowStream',
    });
    return dispose;
  }, []);

  //@ts-ignore
  const {columns,rows,streamType} = JSON.parse(localStorage.getItem("expandPlayConfig"));

  return (
    <RtcEngineContext.Provider value={{ rtcEngine }}>
      <div>
        <div className="expand-play-grid-container" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {showList.map((info: ShowInfo, index) => (
            info.streamUuid != null && (
              <div key={index} className='expand-play-grid-item' style={{ width: 100 / columns + 'vw', height: 100 / rows + "vh" }}>
                <VideoRenderer uid={+info.streamUuid} isLocal={info.isLocal} isMirrorMode={info.isMirrorMode} streamType={streamType}/>
              </div>
            )
          ))}
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