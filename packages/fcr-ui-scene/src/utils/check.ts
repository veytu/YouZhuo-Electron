import { EduClassroomConfig, EduRoleTypeEnum } from 'agora-edu-core';
import { AgoraRteEngineConfig, AgoraRteRuntimePlatform } from 'agora-rte-sdk';

export const isProduction = NODE_ENV === 'production';

export const isWeb = () => {
  return AgoraRteEngineConfig.platform === AgoraRteRuntimePlatform.Web;
};

export const isElectron = () => {
  return AgoraRteEngineConfig.platform === AgoraRteRuntimePlatform.Electron;
};

export const isTeacher = () => {
  return EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.teacher;
};

export const isStudent = () => {
  return EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.student;
};

export const isAssistant = () => {
  return EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.assistant;
};

export const isInvisible = () => {
  return EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.invisible;
};
