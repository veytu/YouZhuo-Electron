import { useCanvasStream } from '@app/hooks/classtalkhooks/useCanvasStream';
import { useState } from 'react';
export const RecordSelect = () => {
  const { createProcess, stopProcess } = useCanvasStream();
  const [isCamera, setIsCamera] = useState(false);
  const handleRecord = () => {
    if (!isCamera) {
      const iptDom = document.createElement('input');
      iptDom.type = 'file';
      iptDom.accept = 'video/*';
      iptDom.addEventListener('change', (event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files ? input.files[0] : null;
        if (file) {
          const localURL = URL.createObjectURL(file);
          createProcess({ isLocal: false, localURL });
          setIsCamera(!isCamera);
        }
      });
      iptDom.click();
    } else {
      cancleRecord();
    }
  };
  const cancleRecord = () => {
    // 返回摄像
    stopProcess();
    createProcess({ isLocal: true });
    setIsCamera(!isCamera);
  };
  return (
    <div
      className="fcr-text-white fcr-w-1/2 fcr-p-2 fcr-cursor-pointer"
      style={{ border: '1px solid #ccc', boxShadow: '0 0 10px #ccc' }}
      onClick={handleRecord}>
      {!isCamera ? '回放录像' : '结束放映'}
    </div>
  );
};
