import { EduRoomTypeEnum } from 'agora-edu-core';
import { FcrMultiThemes, FcrUIConfig } from 'agora-common-libs';
import { roomMidClass } from '../configs/base-ui';
import { baseTheme } from '../configs/base-theme';

export const themes: Record<string, FcrMultiThemes> = {
  default: baseTheme,
};

export const uiConfigs: Record<string, FcrUIConfig> = {
  [EduRoomTypeEnum.RoomSmallClass]: roomMidClass,
};

export const supportedRoomTypes: EduRoomTypeEnum[] = [];

export const loadTheme = (key: string, theme: FcrMultiThemes) => {
  const defaultLightTheme = baseTheme.light;
  const defaultDarkTheme = baseTheme.dark;

  const lightTheme = { ...defaultLightTheme, ...theme.light };
  const darkTheme = { ...defaultDarkTheme, ...theme.dark };

  themes[key] = {
    light: lightTheme,
    dark: darkTheme,
  };
};

export const loadUIConfig = (roomType: EduRoomTypeEnum, config: FcrUIConfig) => {
  if (!supportedRoomTypes.includes(roomType)) {
    supportedRoomTypes.push(roomType);
  }
  uiConfigs[roomType] = config;
};
