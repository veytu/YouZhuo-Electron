import { CSSProperties, FC, ReactNode, useEffect, useState } from 'react';
import './index.css';
import classnames from 'classnames';
import { SvgIconEnum, SvgImg } from '../svg-img';
import { themeVal } from '../../utils/tailwindcss';

export interface CheckboxProps {
  label?: ReactNode;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  styleType?: 'brand' | 'white';
  size?: 'medium' | 'small';
  style?: CSSProperties;
}
export const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    label,
    onChange,
    styleType = 'brand',
    size = 'medium',
    indeterminate,
    style,
    ...inputProps
  } = props;
  const cls = classnames('fcr-checkbox', `fcr-checkbox-${styleType}`, {
    'fcr-checkbox-s': size === 'small',
  });

  const colors = themeVal('colors');
  const [checked, setChecked] = useState(inputProps.checked || false);
  useEffect(() => {
    setChecked(inputProps.checked || false);
  }, [inputProps.checked]);
  return (
    <label className={cls} style={{ ...style }}>
      <span className="fcr-checkbox-input-wrapper">
        <input
          {...inputProps}
          onChange={(e) => {
            onChange?.(e.target.checked);
            setChecked(e.target.checked);
          }}
          type="checkbox"></input>
        <span
          className={classnames('fcr-btn-click-effect fcr-checkbox-inner', {
            'fcr-checkbox-inner-indeterminate': indeterminate && !checked,
          })}>
          {indeterminate && !checked && (
            <SvgImg
              className="fcr-checkbox-input-indeterminate"
              type={SvgIconEnum.FCR_CHEXBOX_INDETERMINATE}
              colors={{
                iconPrimary: styleType === 'brand' ? colors['white'] : colors['brand'][6],
              }}
              size={size === 'small' ? 10 : 12}></SvgImg>
          )}

          <SvgImg
            type={SvgIconEnum.FCR_CHECKBOX_CHECK}
            colors={{
              iconPrimary: styleType === 'brand' ? colors['white'] : colors['brand'][6],
            }}
            size={size === 'small' ? 10 : 12}></SvgImg>
        </span>
      </span>
      {label && <span className="fcr-checkbox-label">{label}</span>}
    </label>
  );
};
