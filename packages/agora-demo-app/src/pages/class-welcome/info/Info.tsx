import type { ClasstalkInfoProps, ClassInfoProps } from '@app/ctype';
import { useClasstalkInfo } from '@app/hooks/classtalkhooks/useClasstalkInfo';
import logoIcon from '@app/assets/classtalk/classtalk.png';
import { useState, useEffect } from 'react';

const Logo: React.FC = () => {
  return (
    <div className="fcr-h-12 fcr-w-16 fcr-ml-4 fcr-mr-4 logo ">
      <img src={logoIcon} alt="" />
    </div>
  );
};
const createTimer = (setTime: any, step: number) => {
  const date = new Date(Date.now());
  const currentTime = date.toLocaleString();
  setTime(currentTime);
  setInterval(() => {
    date.setSeconds(date.getSeconds() + 1);
    setTime(date.toLocaleString());
  }, step);
};

const ClasstalkInfo: React.FC<ClasstalkInfoProps> = (props: ClassInfoProps) => {
  const { classtalkName } = useClasstalkInfo(props);
  const [time, setTime] = useState('');
  useEffect(() => {
    createTimer(setTime, 1000);
  }, []);
  return (
    <div className="fcr-flex fcr-p-10">
      <Logo />
      <div className="fcr-ml-6">
        <div
          style={{ transform: 'translateY(-6px)' }}
          className="fcr-text-2xl fcr-font-bold fcr-text-white">
          {`${classtalkName || '试剑阁'}智慧终端`}{' '}
        </div>
        <div className="fct-font-bold fcr-text-white fcr-tracking-widest">{time}</div>
      </div>
    </div>
  );
};

export default ClasstalkInfo
