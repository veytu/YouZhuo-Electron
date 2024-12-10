import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { SvgIconEnum, SvgImg } from '../svg-img';
import './index.css';
import { themeVal } from '../../utils/tailwindcss';
import { Popover, PopoverProps } from '../popover';
import classnames from 'classnames';
export type ButtonSize = 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
export type ButtonType = 'primary' | 'secondary' | 'text' | 'link';
export type ButtonShape = 'circle' | 'rounded';
export type ButtonStyleType = 'danger' | 'gray' | 'white';

export interface ButtonProps {
  /**
   * 按钮尺寸，可选值为 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS'，默认为'L'
   */
  /** @en
   * Set the size of button, can be set to 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS', default value is 'L'.
   */
  size?: ButtonSize;
  /**
   * 按钮类型，可选值为 'primary' | 'secondary' | 'text' | 'link'，默认为'primary'
   */
  /** @en
   * Set the type of button,can be set to 'primary' | 'secondary' | 'text' | 'link', default value is 'primary'.
   */
  type?: ButtonType;
  /**
   * 按钮形状，可选值为 'circle' | 'rounded'，默认为'circle'
   */
  /** @en
   * Set the shape of button,can be set to 'circle' | 'rounded', default value is 'circle'.
   */
  shape?: ButtonShape;
  /**
   * 按钮样式类型，可选值为 'danger' | 'gray'
   */
  /** @en
   * Set the style type of button, can be set to 'danger' | 'gray'.
   */
  styleType?: ButtonStyleType;
  /**
   * 设置按钮前置图标
   */
  /** @en
   * Set the icon before the button text.
   */
  preIcon?: SvgIconEnum;
  /**
   * 设置按钮后置图标
   */
  /** @en
   * Set the icon after the button text.
   */
  postIcon?: SvgIconEnum;
  /**
   * 设置按钮加载状态
   */
  /** @en
   * Set the loading status of button.
   */
  loading?: boolean;
  /**
   * 按钮禁用状态
   */
  /** @en
   * Disabled state of button.
   */
  disabled?: boolean;
  /**
   * 点击按钮时的回调
   */
  /** @en
   * Set the handler to handle click event.
   */

  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * 将按钮宽度调整为其父宽度的选项，默认为false
   */
  /** @en
   * Option to fit button width to its parent width, default value is false.
   */
  block?: boolean;

  extra?: Partial<PopoverProps>;
}
export const Button: FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const colors = themeVal('colors');

  const {
    block,
    loading,
    type = 'primary',
    shape = 'circle',
    styleType,
    size = 'L',
    preIcon,
    postIcon,
    disabled,
    onClick,
    extra,
    ...otherProps
  } = props;
  const [hover, setHover] = useState(false);
  const [extraPopoverVisible, setExtraPopoverVisible] = useState(false);
  const [extraHover, setExtraHover] = useState(false);

  const iconColor =
    styleType === 'white'
      ? type === 'primary'
        ? hover
          ? colors['white']
          : colors['black']
        : undefined
      : undefined;
  return (
    <button
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      {...otherProps}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'fcr-button',
        `fcr-button-${type}`,
        `fcr-button-${shape}`,
        `fcr-button-${size}`,
        'fcr-btn-click-effect',
        {
          [`fcr-button-${styleType}`]: !!styleType,
          'fcr-button-icon-only': !props.children,
          'fcr-button-block': block,
          'fcr-button-with-extra': extra,
          'fcr-button-extra-active': extra?.visible || extraPopoverVisible || extraHover,
        },
      )}>
      {preIcon && (
        <div className="fcr-button-icon fcr-button-preicon">
          <SvgImg type={preIcon} colors={{ iconPrimary: iconColor }}></SvgImg>
        </div>
      )}

      <p>{props.children}</p>
      {extra && (
        <div className="fcr-button-extra fcr-divider">
          <Popover
            trigger="click"
            showArrow
            visible={extraPopoverVisible}
            mouseEnterDelay={0}
            onVisibleChange={setExtraPopoverVisible}
            {...extra}>
            <div
              onMouseEnter={() => {
                setExtraHover(true);
              }}
              onMouseLeave={() => {
                setExtraHover(false);
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={classnames('fcr-button-extra-inner', {
                'fcr-button-extra-inner-active':
                  extra?.visible || extraPopoverVisible || extraHover,
              })}>
              <SvgImg type={SvgIconEnum.FCR_MORE2}></SvgImg>
            </div>
          </Popover>
        </div>
      )}
      {(loading || postIcon) && !extra && (
        <div>
          <SvgImg
            className={classNames('fcr-button-icon fcr-button-posticon', {
              'fcr-button-loading': loading,
            })}
            colors={{ iconPrimary: iconColor }}
            type={loading ? SvgIconEnum.FCR_BTN_LOADING : postIcon!}></SvgImg>
        </div>
      )}
    </button>
  );
};
