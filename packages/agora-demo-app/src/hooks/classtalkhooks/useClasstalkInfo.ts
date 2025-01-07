import { useEffect, useState } from 'react';
import { getClassroomInfo, getTableInfo, getAgoraData } from '@app/api/classhome';
import type { AgoraParams, ClassInfoProps, IHasCourseWareList } from '@app/ctype';
import { aMessage } from '@app/components/message';

// 处理声网参数
const compilePath = (agoraParams: AgoraParams) => {
  const { role, roomType, roomName, userToken, data, agoraProjectTask } = agoraParams;
  const { talkCloudId, schoolName, id } = data;
  const course = hasCourseWareList(agoraProjectTask);
  return {
    appId: '272b35eccc3848248d08a3a8ccc73b84',
    userUuid: `${id}`,
    rtmToken: decodeURIComponent(userToken),
    roomUuid: `${talkCloudId}`,
    roomName: decodeURI(roomName),
    userName: decodeURI(schoolName),
    roleType: +role,
    roomType: +roomType,
    shareUrl: true,
    courseWareList: course,
  };
};

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
  return result;
};

export const useClasstalkInfo = (props: ClassInfoProps) => {
  const [classtalkName, setClasstalkName] = useState<string>('');

  useEffect(() => {
    // alex-tag-check-mac-fe
    console.log('alex-enter-info');
    if (window?.require) {
      console.log('peter go');
      const ipc = window.require('electron').ipcRenderer;
      const MessageSuccessKey = 'alex-msg-key-success';
      const MessageErrorKey = 'alex-msg-key-error';
      ipc.on('alex-check-mac-reply', async (_, args) => {
        try {
          aMessage.loading({
            content: '获取课表信息...',
            key: MessageSuccessKey,
            duration: 1,
          });
          const isDev = false; // 方便调试
          const { name, id: croomId, } = await getClassroomInfo({ isDev, mac: args || '' });
          sessionStorage.setItem('croomId', croomId);
          setClasstalkName(name);
          const {
            id: tableId,
            timetableId,
            screens,
            ...tableInfo
          } = await getTableInfo({ isDev, id: croomId });
          sessionStorage.setItem('maxGridCount',screens)
          sessionStorage.setItem('tableId', timetableId);
          const agoraParams = await getAgoraData({ isDev, id: tableId });
          const { role } = agoraParams;
          // alex-tag-session-set-role
          sessionStorage.setItem('role', role);
          const agoraConfig = compilePath(agoraParams);
          props.onDone({ agoraConfig, tableInfo });
        } catch (e) {
          console.log(new Error(`IPCError - IPC | Parse Error - ${e}`));
          aMessage.destroy(MessageSuccessKey);
          setTimeout(() => {
            aMessage.error({
              content: '获取课表信息失败，请刷新重试',
              key: MessageErrorKey,
              duration: 1,
            });
          }, 500);
        }
      });
      ipc.send('alex-check-mac', 'main', 'alex');
    }
  }, []);
  return { classtalkName };
};
