// 角色权限
export const ROLE = {
  teacher: {
    id: 1,
    tag: '老师',
  },
  student: {
    id: 2,
    tag: '学生',
  },
  assistant: {
    id: 3,
    tag: '助教',
  },
  observer: {
    id: 4,
    tag: '监课',
  },
};

export const ROOM_TYPE = {
  oneClass: 0,
  smallClass: 4,
  bigClass: 2,
};

// 当前选中的 tab
export const CHAT_TABS_KEYS = {
  chat: 'CHAT',
  user: 'USER',
  notice: 'ANNOUNCEMENT',
};

// 消息模式
export const MSG_TYPE = {
  common: 0,
  question: 1,
  answer: 2,
};
// 拉取消息条数
export const HISTORY_COUNT = 50;
// 公告输入限制
export const ANNOUNCEMENT_SIZE = 500;
// 一键禁言 aciton
export const SET_ALL_MUTE = 'setAllMute';
export const REMOVE_ALL_MUTE = 'removeAllMute';

// 单人禁言
export const MUTE_USER = 'mute';
export const UNMUTE_USER = 'unmute';
// 设置禁言 properties
export const MUTE_CONFIG = {
  mute: 1,
  unMute: 0,
};

/**
 * 本地消息保留条数
 * 修改次参数限制本地消息列表保存的最大条数
 */
export const LOCAL_RETAIN_HISTORY_COUNT = 1000;
/**
 *  消息更新截流设置
 *  修改此参数可降低消息列表渲染频率
 */
export const TEXT_MESSAGE_THROTTLE_TIME_MS = 500;
/**
 *  成员列表更新截流设置
 *  修改此参数可降低成员列表渲染频率
 */
export const MEMBER_LIST_THROTTLE_TIME_MS = 1000;