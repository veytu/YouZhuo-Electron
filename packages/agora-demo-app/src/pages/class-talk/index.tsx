import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { GlobalStoreContext } from '@app/stores';
import { GlobalLaunchOption } from '@app/stores/global';
import { useLocation } from 'react-router';
import { observer } from 'mobx-react';

interface IHasCourseWareList {
  convertedPercentage: number | string;
  pageCount: number | string;
  prefix: string;
  resourceName: string;
  resourceUuid: string | number;
  url: string;
  taskId: string | number;
}
const hasCourseWareList = (options: IHasCourseWareList) => {
  const result = [];
  const { convertedPercentage, pageCount, prefix, resourceName, resourceUuid, url, taskId } =
    options;
  if (resourceName) {
    const object = {
      // 在云盘展示的文件名称
      resourceName: decodeURI(resourceName),
      // 一个唯一ID
      resourceUuid,
      // 文件名后缀
      ext: 'pptx',
      // 白板转换后的资源可留空
      url: decodeURIComponent(url),
      // parentResourceUuid: 'root',
      // type: 1,
      // convertType: 1,
      // 文件大小，单位为字节
      size: 0,
      // 文件最后更新时间，单位为毫秒
      updateTime: Date.now(),
      // 此处传入白板资源转换任务ID
      taskUuid: taskId,
      // 此处需要传入你调用白板API发起白板资源转换任务时的传递的参数
      conversion: {
        type: 'dynamic',
        preview: true,
        scale: 1.2,
        outputFormat: 'png',
        canvasVersion: true,
      },
      taskProgress: {
        prefix: decodeURIComponent(prefix), // 转换后的资源前缀，取白板转换结果中的 prefix 如果有的话
        // 总页数，取白板转换结果中 pageCount 字段
        totalPageSize: pageCount,
        // 总页数，取白板转换结果中 pageCount 字段
        convertedPageSize: pageCount,
        // 转换进度，取白板转换结果中 convertedPercentage 字段
        convertedPercentage,
        // 留空数组
        // convertedFileList: [],
        // 转换进度，取白板转换结果中 status 字段
        // currentStep: '',
        status: 'Finished',
      },
    };
    result[0] = object;
  }
  console.log(result);
  return result;
};

export const ClassTalk = observer(() => {
  const location = useLocation();
  const history = useHistory();
  const { language, region, setLaunchConfig } = useContext(GlobalStoreContext);
  useEffect(() => {
    Enter();
  }, []);
  // effect submit
  const Enter = () => {
    // classtalk token flag
    interface ICOptions {
      [key: string]: string;
    }
    const optionsStr = location.search.slice(1).split('&');
    const options: ICOptions = {};
    optionsStr.forEach((item) => {
      const [key, value] = item.split('=');
      options[`${key}`] = value;
    });
    const {
      role,
      token,
      talkCloudId,
      id,
      schoolName,
      roomName,
      roomType,
      convertedPercentage,
      pageCount,
      prefix,
      resourceName,
      resourceUuid,
      url,
      taskId,
      courseSectionId,
    } = options;
    Object.keys(options).forEach((key) => {
      console.log(key, options[key]);
    });
    //@ts-ignore
    const config: GlobalLaunchOption = {
      appId: '272b35eccc3848248d08a3a8ccc73b84',
      userUuid: id,
      rtmToken: decodeURIComponent(token),
      roomUuid: talkCloudId,
      roomName: decodeURI(roomName),
      userName: decodeURI(schoolName),
      roleType: +role,
      region,
      language,
      roomType: +roomType,
      shareUrl: true,
      courseWareList: hasCourseWareList({
        convertedPercentage,
        pageCount,
        prefix,
        resourceName,
        resourceUuid,
        url,
        taskId,
      }),
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
    };

    // save talkCloudId
    sessionStorage.setItem('tableId', talkCloudId);
    sessionStorage.setItem('courseSectionId', courseSectionId);
    //@ts-ignore
    setLaunchConfig(config);
    history.push('/launch');
  };
  return (
    <div className="fcr-h-full fcr-flex fcr-justify-center fcr-items-center fcr-font-bold fcr-text-xl">
      Entering the ClassTalk ClassRoom...
    </div>
  );
});
