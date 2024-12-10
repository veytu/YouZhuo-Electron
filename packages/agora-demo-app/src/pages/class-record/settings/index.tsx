import { PlayIcon, StopIcon } from '@app/utils/classicons';
import { ResolutionComp } from './resolutioncomp';
import { RecordSelect } from './recordselect';
export const SettingComp = (props: {
  onBtnChange: (state: boolean) => void;
  isRecording: boolean;
}) => {
  // 录制状态
  const handleStart = () => {
    props.onBtnChange(true);
    window.require('electron').ipcRenderer.send('alex-start-record');
  };
  const handleEnd = () => {
    props.onBtnChange(false);
    window.require('electron').ipcRenderer.send('alex-stop-record');
  };
  // 地址
  const recordUrl = 'rtsp://192.168.1.88/4';

  return (
    <div className="fcr-flex fcr-justify-center fcr-items-center fcr-text-center">
      <div className="fcr-w-1/4">
        <ResolutionComp></ResolutionComp>
      </div>
      <div className="fcr-text-white fcr-flex-1 fcr-h-full fcr-flex fcr-items-center fcr-flex-col">
        <div className="fcr-flex fcr-w-full fcr-justify-evenly fcr-pt-4 fcr-h-1/3">
          {/* <div>课程名称: xxxx小学 </div> */}
          <div>直播源地址: {recordUrl}</div>
        </div>
        {!props.isRecording ? (
          <div onClick={handleStart} className="fcr-cursor-pointer">
            <ImageIcon iconSrc={PlayIcon} className=""></ImageIcon>
          </div>
        ) : (
          <div onClick={handleEnd} className="fcr-cursor-pointer">
            <ImageIcon iconSrc={StopIcon} className=""></ImageIcon>
          </div>
        )}
      </div>
      <div className="fcr-w-1/4">
        <RecordSelect></RecordSelect>
      </div>
    </div>
  );
};

const ImageIcon = (props: { className: string; iconSrc: string }) => {
  const className = props.className || '';
  return <img key={Math.random()} src={props.iconSrc} className={className} />;
};
