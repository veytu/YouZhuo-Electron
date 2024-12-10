import { receiveRTCRawData } from '@classroom/infra/utils/ipc';
import { useState, useEffect } from 'react';
import AgoraRtcEngine from 'agora-electron-sdk/types/Api';
export const useRtcEngine = () => {
 const [rtcEngine] = useState<AgoraRtcEngine>(
 () => new (window.require('agora-electron-sdk').default)() as 
AgoraRtcEngine,
 );
 useEffect(() => {
 const rtcRawDataEventDisposer = receiveRTCRawData((e, payload) => {
 //@ts-ignore
 rtcEngine.onRegisterDeliverFrame(payload);
 });
 return rtcRawDataEventDisposer;
 }, [rtcEngine]);
 return { rtcEngine };
};