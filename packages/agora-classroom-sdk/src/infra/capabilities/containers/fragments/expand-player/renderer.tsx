import { CSSProperties, FC, useContext, useEffect, useRef } from 'react';
import { RtcEngineContext } from './context';
import { CameraPlaceholderType } from '@classroom/infra/stores/common/stream/struct';
import { CameraPlaceHolder } from '@classroom/ui-kit';
import { AgoraRteMediaPublishState, AgoraRteMediaSourceState } from 'agora-rte-sdk';
import { ShowInfo } from '.';
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
export const VideoRenderer: FC<{ info: ShowInfo, streamType: number }> = ({ info, streamType }) => {
  const isCameraMuted = AgoraRteMediaSourceState.started !== info?.videoSourceState  || AgoraRteMediaPublishState.Unpublished === info?.videoState
  return (
    <div className="fcr-w-full fcr-h-full fcr-relative">
      {!isCameraMuted ? info.isLocal ? <LocalRenderer isMirrorMode={info.isMirrorMode} /> : <RemoteRenderer uid={+(info?.streamUuid || 0)} streamType={streamType} /> : <></>}
      {isCameraMuted && <CameraPlaceHolder style={{ position: 'absolute', top: 0 }} state={CameraPlaceholderType.muted} />}
    </div>
  );
};
