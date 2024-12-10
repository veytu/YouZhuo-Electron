export type ClasstalkInfoProps = {
  onDone: (e: InClassTalkConfig) => void;
};

export type InClassTalkConfig = {
  agoraConfig: AgoraConfig;
  tableInfo: TableInfo;
};

export type AgoraConfig = {
  appId: string;
  userUuid: string;
  rtmToken: string;
  roomUuid: string;
  roomName: string;
  userName: string;
  roleType: number;
  roomType: number;
  shareUrl: boolean;
  courseWareList: any;
};

export type TableInfo = {
  subjectName: string;
  offlineTeacher: string;
  onlineTeacher: string;
  startTime: string;
  endTime: string;
  courseName: string;
};

export interface ClassInfoProps {
  onDone: (e: InClassTalkConfig) => void;
}
export interface TableInfoProps {
  tableConfig: TableInfo;
  onEnter: () => void;
}

interface AgoraData {
  talkCloudId: string;
  schoolName: string;
  id: string;
}

export interface AgoraParams {
  role: string | number;
  roomName: string;
  roomType: string;
  userToken: string;
  data: AgoraData;
  agoraProjectTask: IHasCourseWareList;
}

export interface IHasCourseWareList {
  convertedPercentage: number | string;
  pageCount: number | string;
  prefix: string;
  resourceName: string;
  resourceUuid: string | number;
  url: string;
  taskId: string | number;
}
// classtalk token flag
export interface ICOptions {
  [key: string]: string;
}
