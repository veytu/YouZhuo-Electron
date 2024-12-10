import classNames from 'classnames';
import React, { CSSProperties, ChangeEvent, FC, useRef, useState } from 'react';
import { SvgIconEnum, SvgImg } from '../svg-img';
import './index.css';

export type InputProps = {
  /**
   * 输入框的提示符
   */
  /** @en
   * Placeholder of the input box
   */
  placeholder?: string;
  /**
   * 输入框中的值
   */
  /** @en
   * Value of the input box
   */
  value?: string;
  /**
   * 输入框的标签，一般展示在输入框的头部，提示用户需要输入的内容
   */
  /** @en
   * The label of the input box, usually displayed at the head of the input box, prompting the user to enter the content
   */
  label?: string;
  /**
   * 输入框是否禁用
   */
  /** @en
   * Whether the input box is disabled
   */
  disabled?: boolean;
  /**
   * 输入框前置图标，仅在 variant = rounded 时生效
   */
  /** @en
   * Input box front icon, takes effect only if variant = rounded
   */
  iconPrefix?: SvgIconEnum;
  /**
   * 输入框的尺寸：
   * medium - 中等(default)
   * large - 大
   */
  /** @en
   * Size of the input box:
   * medium
   * large
   */
  size?: 'large' | 'medium' | 'small' | 'mini';
  /**
   * 值变更事件
   * @param value 变更值
   */
  /** @en
   * Change event of the input's value
   * @param value changed value
   */
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  allowClear?: boolean;
  autoFocus?: boolean;
  style?: CSSProperties;
  shape?: 'circle' | 'rounded';
  maxLength?: number;
};

export const Input: FC<InputProps> = ({
  placeholder,
  value = '',
  disabled,
  iconPrefix,
  size = 'medium',
  label,
  onChange = () => {},
  onBlur = () => {},
  onKeyDown = () => {},
  onKeyUp = () => {},
  allowClear = true,
  autoFocus,
  style,
  shape = 'circle',
  maxLength,
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur();
  };

  const handleClear = () => {
    onChange('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const cls = classNames('fcr-input', `fcr-input-${shape}`, {
    'fcr-input--focused': focused,
    'fcr-input-l': size === 'large',
    'fcr-input-m': size === 'medium',
    'fcr-input-s': size === 'small',
    'fcr-input-xs': size === 'mini',

    'fcr-input--disabled': disabled,
  });

  const iconWrapCls = classNames('fcr-input-icon-wrap', {
    'fcr-input-icon-wrap--invisible': disabled || !focused,
  });
  const iconCls = classNames('fcr-input-icon', {});

  const labelCls = classNames('fcr-input-label', {});

  return (
    <React.Fragment>
      {label && <label className={labelCls}>{label}</label>}
      <div className={cls} style={style} onClick={handleClick}>
        {iconPrefix && <SvgImg style={{ marginRight: 10 }} size={18} type={iconPrefix} />}
        <input
          maxLength={maxLength}
          ref={inputRef}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          autoFocus={autoFocus}
        />
        {allowClear && (
          <div className={iconWrapCls} onMouseDown={handleClear}>
            <SvgImg className={iconCls} type={SvgIconEnum.FCR_CLOSE} size={18} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
