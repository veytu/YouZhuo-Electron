import { classtalkDomain } from '@app/utils';
enum ResId {
  SUCCESS = 10000,
  FAILE = 10004,
}

interface BaseItem {
  isDev: boolean;
  url: string;
  inData: boolean;
}

interface RecordArg {
  pageNum: number;
  pageSize: number;
  controller: AbortController;
}
const baseRequest = async ({ isDev, url, inData = true }: BaseItem) => {
  console.log("Device: " + isDev);
  const domain = classtalkDomain({ isDev });
  const result = await fetch(`${domain}${url}`).then((res) => res.json());
  if (result?.data && inData) {
    return {
      ...result.data,
      code: 10000,
    };
  } else if (result?.data && !inData) {
    return {
      ...result,
      code: 10000,
    };
  }
  return { msg: 'No such data', code: 10004 };
};
// 请求教室信息 (mac=> info)
export async function getClassroomInfo({ isDev, mac }: { isDev: boolean; mac: string }) {
  const url = `/api/getInfoByMacAddress/${mac}`;
  try {
    const result = await baseRequest({ isDev, url, inData: true });
    if (result.code == ResId.SUCCESS) {
      return { name: result.name, id: result.id };
    } else {
      return { name: '', id: '' };
    }
  } catch (error) {
    throw new Error(`Request Error - mac - info: ${error || ''}`);
  }
}

// 请求课表信息(info=> timetableId)
// /api/todayTimetable/{classroomId}

export async function getTableInfo({ isDev, id }: { isDev: boolean; id: string }) {
  const url = `/api/todayTimetable/${id}`;
  try {
    const result = await baseRequest({ isDev, url, inData: true });
    if (result.code == ResId.SUCCESS) {
      return result[0];
    } else {
      return {};
    }
  } catch (error) {
    throw new Error(`Request Error - table - info: ${error || ''}`);
  }
}

// 获取上课参数
export async function getAgoraData({ isDev, id }: { isDev: boolean; id: string }) {
  const url = `/api/agora/getAgoraCloudId/${id}`;
  try {
    const result = await baseRequest({ isDev, url, inData: false });
    if (result.code == ResId.SUCCESS) {
      return result;
    } else {
      return {};
    }
  } catch (error) {
    throw new Error(`Request Error - table - info: ${error || ''}`);
  }
}

// 获取录制列表
export async function fetchRecordList({ pageNum = 1, pageSize = 5, controller }: RecordArg) {
  const result = await fetch(
    `https://h5.classkid.net/api/courseRecord/list/?classroomId=${sessionStorage.getItem(
      'croomId',
    )}&pageNum=${pageNum}&pageSize=${pageSize}`,
    { signal: controller.signal },
  ).then((res) => res.json());
  return result;
}
