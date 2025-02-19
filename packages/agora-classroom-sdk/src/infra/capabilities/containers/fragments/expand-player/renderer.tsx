import { CSSProperties, FC, useContext, useEffect, useRef } from 'react';
import { RtcEngineContext } from './context';
import { CameraPlaceholderType } from '@classroom/infra/stores/common/stream/struct';
import { CameraPlaceHolder } from '@classroom/ui-kit';
import { AgoraRteMediaPublishState, AgoraRteMediaSourceState } from 'agora-rte-sdk';
/**
 *
 */
export const LocalRenderer: FC<{ isMirrorMode: boolean }> = ({ isMirrorMode }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const context = useContext(RtcEngineContext);
  useEffect(() => {
    const { rtcEngine } = context;
    if (domRef.current && rtcEngine) {
      rtcEngine.initRender('local', domRef.current, '');
    }
    return () => {
      if (rtcEngine) rtcEngine.destroyRender('local', '');
    };
  }, [context.rtcEngine]);
  const style: CSSProperties = { width: '100%', height: '100%', overflow: 'hidden' };
  if (!isMirrorMode) {
    style.transform = 'rotateY(180deg)';
  }
  return <div style={style} ref={domRef} ></div>;
};
/**
 *
 */
export const RemoteRenderer: FC<{ uid: number; className?: string,streamType?:number  }> = ({ uid, className,streamType }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const context = useContext(RtcEngineContext);
  useEffect(() => {
    const { rtcEngine } = context;
    if (domRef.current && rtcEngine) {
      rtcEngine.initRender(uid, domRef.current, '');
      if(streamType){
        rtcEngine.setRemoteVideoStreamType(uid,streamType );
      }
    }
    return () => {
      if (rtcEngine) {
        rtcEngine.destroyRender(uid, '');
      }
    };
  }, [context.rtcEngine]);
  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      ref={domRef}
    />
  );
};
export const VideoRenderer: FC<{ uid: number; isLocal: boolean; isMirrorMode: boolean,streamType?:number }> = ({
  uid,
  isLocal,
  isMirrorMode,
  streamType,
}) => {
  return (
    <div className="fcr-w-full fcr-h-full fcr-relative">
      { isLocal ? <LocalRenderer isMirrorMode={isMirrorMode} /> : <RemoteRenderer uid={uid} streamType={streamType} />}
    </div>
  );
};
export const TeacherVideoRenderer: FC<{ uid: number; isLocal: boolean; isMirrorMode: boolean,streamType?:number,videoSourceState?:AgoraRteMediaSourceState }> = ({
  uid,
  isLocal,
  isMirrorMode,
  streamType,
  videoSourceState,
}) => {
  const isOpenCamera = AgoraRteMediaSourceState.starting === videoSourceState || AgoraRteMediaSourceState.started === videoSourceState
  return (
    <div className="fcr-w-full fcr-h-full fcr-relative">
      {isOpenCamera ? isLocal ? <LocalRenderer isMirrorMode={isMirrorMode} /> : <RemoteRenderer uid={uid} streamType={streamType} /> : <></>}
      {!isOpenCamera && <CameraPlaceHolder style={{ position: 'absolute', top: 0 }} state={CameraPlaceholderType.notpresent} />}
    </div>
  );
};
