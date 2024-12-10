import { useClasstalkSystem } from '@app/hooks/classtalkhooks/useClasstalkSystem';
import { ScreenIcon, WifiIcon, CameraIcon } from '@app/utils/classicons';
import { SysInfoText } from './stype';
const SystemInfo = () => {
  const [screenNum, cameraNum, sysMemo, sysFreeMemo, dl, rtt] = useClasstalkSystem();
  return (
    <div className="sys-shadow fcr-p-4 fcr-flex fcr-flex-col">
      <div className="fcr-text-white fcr-font-bold fcr-text-lg">{SysInfoText.sysTitle}</div>
      <div className="fcr-text-white fcr-flex fcr-flex-col fcr-justify-evenly fcr-items-start fcr-mt-4 fcr-ml-2 fcr-flex-1">
        <p>
          {`${SysInfoText.smText}${SysInfoText.semoChar}`}{' '}
          {new Array(screenNum).fill(0).map((_, index) => (
            <ImageIcon key={index} className="fcr-inline-block fcr-ml-4" iconSrc={ScreenIcon} />
          ))}
        </p>
        <p>
          {`${SysInfoText.netText}${SysInfoText.semoChar}`}
          <ImageIcon className="fcr-inline-block fcr-ml-4" iconSrc={WifiIcon} />
          <span
            className="fcr-ml-2"
            style={{ transform: 'translateY(5px)', display: 'inline-block', fontSize: '10px' }}>
            {`RTT-${rtt} DL-${dl}M/s`}
          </span>
        </p>
        <p>
          {`${SysInfoText.cmText}${SysInfoText.semoChar}`}{' '}
          {new Array(cameraNum).fill(0).map((_, index) => (
            <ImageIcon key={index} className="fcr-inline-block fcr-ml-5" iconSrc={CameraIcon} />
          ))}{' '}
        </p>
        <p>
          {`${SysInfoText.memoText}${SysInfoText.semoChar}`}
          <span className="fcr-ml-4"> {` ${sysMemo}G - ${sysFreeMemo}G`}</span>
        </p>
        <p>
          {`${SysInfoText.versionText}${SysInfoText.semoChar}`}
          <span className="fcr-ml-4">v2.0.1</span>
        </p>
      </div>
    </div>
  );
};
const ImageIcon = (props: { className: string; iconSrc: string }) => {
  const className = props.className || '';
  return <img key={Math.random()} src={props.iconSrc} className={className} />;
};

export default SystemInfo;
