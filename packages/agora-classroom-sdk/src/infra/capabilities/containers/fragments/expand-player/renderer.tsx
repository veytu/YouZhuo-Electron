import { CSSProperties, FC, useContext, useEffect, useRef } from 'react';
import { RtcEngineContext } from './context';
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
export const RemoteRenderer: FC<{ uid: number; className?: string }> = ({ uid, className }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const context = useContext(RtcEngineContext);
  useEffect(() => {
    const { rtcEngine } = context;
    if (domRef.current && rtcEngine) {
      rtcEngine.initRender(uid, domRef.current, '');
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
export const VideoRenderer: FC<{ uid: number; isLocal: boolean; isMirrorMode: boolean }> = ({
  uid,
  isLocal,
  isMirrorMode,
}) => {
  return (
    <div className="fcr-w-full fcr-h-full fcr-relative">
      {isLocal ? <LocalRenderer isMirrorMode={isMirrorMode} /> : <RemoteRenderer uid={uid} />}
    </div>
  );
};
