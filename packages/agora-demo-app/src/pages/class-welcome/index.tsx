import { observer } from 'mobx-react';
import ClasstalkInfo from './info/Info';
import CompositeArea from './composite/index';
import type { InClassTalkConfig, TableInfo, AgoraConfig, TableInfoProps } from '@app/ctype';
import { useHistory } from 'react-router';
import { useState, useContext } from 'react';
import { GlobalStoreContext } from '@app/stores';
import { checkBrowserDevice } from '@app/utils/browser';
import './index.css';
import NoClass from '@app/assets/classtalk/noclass.svg';
import { Dropdown } from '@app/components/dropdown';

export const ClassWelcome = observer(() => {
  const [agoraLaunchConfig, setAgoraLaunchConfig] = useState<AgoraConfig | null>(null);
  const [tableConfig, setTableConfig] = useState<TableInfo | null>(null);
  const history = useHistory();
  const { language, region, setLaunchConfig } = useContext(GlobalStoreContext);
  const [expandPlayConfig, setExpandPlayConfig] = useState({columns:3, rows:3, streamType:1});
  const handleFetchDone = async (params: InClassTalkConfig) => {
    console.log('handleFetchDone', params);
    setTableConfig(params.tableInfo);
    setAgoraLaunchConfig(params.agoraConfig);
  };
  const webRTCCodec = 'vp8';
  const gridCount = [{text:"4",value:'2,2'},{text:"6",value:'3,2'},{text:"9",value:'3,3'}]
  localStorage.setItem("expandPlayConfig",JSON.stringify(expandPlayConfig))

  const handleEnter = () => {
    const config = {
      platform: checkBrowserDevice(),
      duration: 45 * 60,
      mediaOptions: {
        web: {
          codec: webRTCCodec,
        },
        cameraEncoderConfiguration: {
          width: 1280,
          height: 720,
          frameRate: 30,
          bitrate: 1600,
        },
        lowStreamCameraEncoderConfiguration: {
          width: 425,
          height: 240,
          frameRate: 15,
          bitrate: 300,
        },
        screenShareEncoderConfiguration: {
          width: 1280,
          height: 720,
          frameRate: 30,
          bitrate: 1000,
        },
      },
    };
    let pretest = false;
    // 登陆过
    if (!localStorage.getItem('pretest')) {
      localStorage.setItem('pretest', 'true');
      pretest = true;
    }
    console.log({ language, region, pretest, ...config, ...agoraLaunchConfig }, 'All-config');
    //@ts-ignore
    setLaunchConfig({ language, region, pretest, ...config, ...agoraLaunchConfig });
    history.push('/launch');
  };
  return (
    <div>
      <div className="classtalk-enter-wrapper">
        <ClasstalkInfo onDone={(params: InClassTalkConfig) => handleFetchDone(params)} />
        <div className=" fcr-w-full fcr-flex fcr-justify-center">
          <div className="classtalk-content fcr-w-7/12">
            <div className="regular-class fcr-flex fcr-flex-col">
              <div className="fcr-p-4 fcr-text-white fcr-font-bold fcr-text-lg">今日课程</div>
              {tableConfig ? (
                <InterItem tableConfig={tableConfig} onEnter={handleEnter} />
              ) : (
                <div className="fcr-mt-4 fcr-w-full fcr-flex fcr-justify-center fcr-flex-1">
                  <img className="fcr-w-1/2" src={NoClass} alt="noclass" />
                </div>
              )}
            </div>
            <CompositeArea />
          </div>
        </div>
      </div>
      <div style={{ zIndex: 999, position: 'absolute',left:0,top:0 }}>
        <Dropdown options={gridCount} value={expandPlayConfig.columns + "," + expandPlayConfig.rows} width={100} onChange={function (value: string): void {
          expandPlayConfig.columns = Number(value.split(',')[0])
          expandPlayConfig.rows = Number(value.split(',')[1])
          expandPlayConfig.streamType = value == "2,2" ? 0 : 1
          setExpandPlayConfig({...expandPlayConfig})
          localStorage.setItem("expandPlayConfig",JSON.stringify(expandPlayConfig))
        }} />
      </div>
    </div>
  );
});

const InterItem = (props: TableInfoProps) => {
  const { tableConfig, onEnter } = props;
  const { startTime, endTime, subjectName, onlineTeacher, offlineTeacher, courseName } =
    tableConfig;
  return (
    <div className="inter-item">
      <div className="fcr-p-2 fcr-pl-6 fcr-text-white fcr-text-base fcr-font-bold">
        <div>{`${startTime}-${endTime}`}</div>
        <div className="fcr-mt-1 fcr-text-sm fcr-font-normal">{`${subjectName}`}</div>
      </div>
      <div className="fcr-p-2 fcr-pl-6 fcr-text-white fcr-text-base fcr-font-bold">
        <div>{`${onlineTeacher}/${offlineTeacher}`}</div>
        <div className="fcr-mt-1 fcr-text-sm fcr-font-normal">{`${courseName}`}</div>
      </div>
      <div
        className="fcr-flex fcr-justify-center fcr-items-center fcr-cursor-pointer"
        onClick={onEnter}>
        👉
      </div>
    </div>
  );
};
