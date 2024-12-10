import classNames from 'classnames';
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import isNumber from 'lodash/isNumber';
import { SvgIconEnum, SvgImg } from '../svg-img';

import './index.css';
import { useClickAnywhere } from '../../utils/hooks/use-click-anywhere';

export type InputNumberProps = {
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
  value?: number;
  /**
   * 每次点变更的值
   */
  /**@en
   * the value that changes each time click
   */
  step?: number;
  /**
   * 输入框最小值
   */
  /** @en
   * Min value of the input
   */
  min?: number;
  /**
   * 输入框最大值
   */
  /** @en
   * Max value of the input
   */
  max?: number;
  /**
   * 输入框是否禁用
   */
  /** @en
   * Whether the input box is disabled
   */
  disabled?: boolean;
  /**
   * 输入框的尺寸：
   * small - 小
   * medium - 中等(default)
   * large - 大
   */
  /** @en
   * Size of the input box:
   * small
   * medium(default)
   * large
   */
  size?: 'large' | 'medium' | 'small';
  /**
   * 值变更事件
   * @param value 变更值
   */
  /** @en
   * Change event of the input's value
   * @param value changed value
   */
  onChange?: (value: number | null) => void;
};

export const InputNumber: FC<InputNumberProps> = ({
  placeholder,
  value,
  step = 1,
  min,
  max,
  disabled,
  size = 'medium',
  onChange = () => {},
}) => {
  const [focused, setFocused] = useState(false);
  const [innerVal, setInnerVal] = useState('');
  const lastValidNum = useRef<number | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNumber(value)) {
      setInnerVal(`${value}`);
      lastValidNum.current = value;
    }
  }, [value]);

  const getValidNumber = (n: number) => {
    if (isNumber(max)) {
      n = Math.min(max, n);
    }
    if (isNumber(min)) {
      n = Math.max(min, n);
    }
    return n;
  };
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    if (!isNumber(lastValidNum.current)) {
      setInnerVal('');
      return;
    }

    if (/^-?\d+$/.test(innerVal)) {
      const n = parseInt(innerVal, 10);
      const vn = getValidNumber(n);
      if (vn !== n) {
        setInnerVal(`${vn}`);
        lastValidNum.current = vn;
        onChange(vn);
      }
    } else {
      setInnerVal(`${lastValidNum.current}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const s = e.target.value.trim();

    setInnerVal(e.target.value);

    if (!s && lastValidNum.current !== null) {
      lastValidNum.current = null;
      onChange(null);
    }

    if (/^-?\d+$/.test(s)) {
      const n = parseInt(e.target.value, 10);
      const vn = getValidNumber(n);
      if (n === vn) {
        lastValidNum.current = vn;
        onChange(vn);
      }
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const cls = classNames('fcr-input-number', {
    'fcr-input-number--focused': focused,
    'fcr-input-number-l': size === 'large',
    'fcr-input-number-m': size === 'medium',
    'fcr-input-number-s': size === 'small',
    'fcr-input-number--disabled': disabled,
  });

  const handleAdd = (e: React.MouseEvent) => {
    if (disabled) {
      return;
    }
    e.stopPropagation();
    setFocused(true);
    let n = (lastValidNum.current ?? 0) + step;
    if (isNumber(max)) {
      n = Math.min(max, n);
    }
    setInnerVal(`${n}`);
    lastValidNum.current = n;
    onChange(n);
  };
  const handleSubtract = (e: React.MouseEvent) => {
    if (disabled) {
      return;
    }
    e.stopPropagation();
    setFocused(true);
    let n = (lastValidNum.current ?? 0) - step;
    if (isNumber(min)) {
      n = Math.max(min, n);
    }
    setInnerVal(`${n}`);
    lastValidNum.current = n;
    onChange(n);
  };

  const ref = useClickAnywhere(() => {
    setFocused(false);
  });

  const addCls = classNames('fcr-input-number__button', {
    'fcr-input-number__button--disabled':
      disabled || (isNumber(max) && (lastValidNum.current ?? 0) >= max),
  });
  const subCls = classNames('fcr-input-number__button', {
    'fcr-input-number__button--disabled':
      disabled || (isNumber(min) && (lastValidNum.current ?? 0) <= min),
  });

  return (
    <div className={cls} onClick={handleClick} ref={ref}>
      <input
        ref={inputRef}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={innerVal}
        disabled={disabled}
        onChange={handleChange}
      />
      <div className="fcr-input-number__button-group">
        <div className={addCls} onClick={handleAdd}>
          <SvgImg
            type={SvgIconEnum.FCR_ORDER_UP}
            size={10}
            colors={{ iconPrimary: 'currentColor' }}
          />
        </div>
        <div className="fcr-input-number__divider" />
        <div className={subCls} onClick={handleSubtract}>
          <SvgImg
            type={SvgIconEnum.FCR_ORDER_DOWN}
            size={10}
            colors={{ iconPrimary: 'currentColor' }}
          />
        </div>
      </div>
    </div>
  );
};
