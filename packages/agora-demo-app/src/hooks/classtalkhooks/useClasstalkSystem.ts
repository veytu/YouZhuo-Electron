import { aMessage } from '@app/components/message';
import { useEffect, useState } from 'react';

export const useClasstalkSystem = () => {
  const [screenNum, setScreenNum] = useState<number>(0);
  const [cameraNum, setCameraNum] = useState<number>(0);
  const [sysMemo, setSysMemo] = useState<number>(0);
  const [sysFreeMemo, setSysFreeMemo] = useState<number>(0);
  const [rtt, setRtt] = useState<number>(0);
  const [dl, setDl] = useState<number>(0);

  const getUserVideoDevices = async () => {
    const allDevices = await window.navigator.mediaDevices.enumerateDevices();
    const videoDevices = allDevices.filter((device) => device.kind === 'videoinput');
    return videoDevices.length;
  };
  const networkInfo = () => {
    //@ts-ignore
    const network = window.navigator?.connection;
    if (!network) return;
    setRtt(network.rtt);
    setDl(network.downlink);
  };
  useEffect(() => {
    networkInfo();
    if (window.require('electron')) {
      const ipc = window.require('electron').ipcRenderer;
      getUserVideoDevices().then((num) => setCameraNum(num));
      ipc.send('alex-get-sysinfo', 'main', 'sysinfo');
      ipc.on('alex-get-sysinfo-reply', (_, arg) => {
        try {
          const { sysObj } = JSON.parse(arg);
          const {
            screenNum: sn,
            memo: mm,
            restMemo: rm,
          } = sysObj ?? { screenNum: 0, sysMemo: 0, sysFreeMemo: 0 };
          console.log(sysObj);
          const powBase = 10 ** 9;
          setScreenNum(sn);
          sessionStorage.setItem('screen', sn);
          setSysMemo(Math.floor(mm / powBase));
          setSysFreeMemo(Math.floor(rm / powBase));
        } catch (error) {
          console.log(`Device-Check-Error. ${error}`);
          //TODO: 错误处理
          aMessage.error('设备检测失败，请检查设备连接');
        }
      });
    }
  }, []);
  return [screenNum, cameraNum, sysMemo, sysFreeMemo, dl, rtt];
};
