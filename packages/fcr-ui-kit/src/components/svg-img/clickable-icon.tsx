import { FC } from 'react';
import { SvgIconEnum, SvgImg, SvgImgProps } from '.';
import classnames from 'classnames';
import './clickable-icon.css';
import { themeVal } from '../../utils/tailwindcss';
import { ToolTip } from '../tooltip';

interface ClickableIconProps {
  size?: 'large' | 'small' | 'mini';
  icon: SvgIconEnum;
  iconSize?: number;
  disabled?: boolean;
  classNames?: string;
  onClick?: () => void;
  iconProps?: SvgImgProps;
}
export const ClickableIcon: FC<ClickableIconProps> = (props) => {
  const { icon, size = 'small', classNames, onClick, disabled, iconProps, ...otherProps } = props;
  const colors = themeVal('colors');

  return (
    <button
      {...otherProps}
      disabled={disabled}
      onClick={onClick}
      className={classnames(
        'fcr-clickabel-icon',
        `fcr-clickable-icon-${size}`,
        'fcr-btn-click-effect',
        classNames,
      )}>
      <SvgImg
        type={icon}
        size={size === 'large' ? 32 : 20}
        colors={{
          iconPrimary: colors?.['notsb-inverse'],
          iconSecondary: colors?.['notsb-inverse'],
        }}
        {...iconProps}></SvgImg>
    </button>
  );
};
export interface PretestDeviceIconProps {
  icon: SvgIconEnum;
  onClick?: () => void;
  disabled?: boolean;
  classNames?: string;
  status: 'active' | 'inactive' | 'idle' | 'disabled';
  tooltip: string;
  iconProps?: Partial<SvgImgProps>;
  size?: 'large' | 'small';
}
export const PretestDeviceIcon: FC<PretestDeviceIconProps> = (props) => {
  const {
    status,
    icon,
    onClick,
    classNames,
    tooltip,
    iconProps,
    size = 'large',
    ...otherProps
  } = props;

  return (
    <ToolTip content={tooltip}>
      <ClickableIcon
        {...otherProps}
        {...iconProps}
        onClick={status === 'disabled' ? () => {} : onClick}
        icon={icon}
        size={size}
        classNames={classnames(`fcr-pretest-device-icon-${status}`, classNames)}></ClickableIcon>
    </ToolTip>
  );
};
