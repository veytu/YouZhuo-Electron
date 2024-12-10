import { useEffect } from 'react';
import { useCanvasStream } from '@app/hooks/classtalkhooks/useCanvasStream';

export const CanvasComp = (props: { isRecording: boolean }) => {
  const { createProcess, RegMoni } = useCanvasStream();
  useEffect(() => {
    createProcess({ isLocal: true });
    RegMoni();
  }, []);

  return (
    <div
      className=" fcr-flex fcr-justify-center fcr-items-center"
      >
      <div className="fcr-relative">
        <canvas id="render"></canvas>
        {props.isRecording && (
          <span
            className="fcr-text-red fcr-font-bold fcr-text-2xl fcr-left-5"
            style={{ position: 'absolute', top: '10px' }}>
            录制中
          </span>
        )}
      </div>
      <div>
        <video autoPlay id="video" controls style={{ display: 'none' }}></video>
        <video autoPlay id="video-local" controls style={{ display: 'none' }}></video>
      </div>
    </div>
  );
};
