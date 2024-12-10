import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import './index.css';
import classnames from 'classnames';
import { SvgIconEnum, SvgImg } from '../svg-img';
import { themeVal } from '../../utils/tailwindcss';
import { v4 as uuid } from 'uuid';
export interface RadioProps {
  label?: ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: () => void;
  styleType?: 'brand' | 'white' | 'transparent';
  name?: string;
  value?: string;
}
export const Radio: FC<React.PropsWithChildren<RadioProps>> = (props) => {
  const groupContext = useContext(RadioGroupContext);
  const {
    label,
    onChange,
    styleType = 'brand',
    name,
    value,
    checked,
    onClick,
    ...inputProps
  } = props;

  const colors = themeVal('colors');
  return (
    <label className={classnames('fcr-radio', `fcr-radio-${styleType}`)}>
      <span className="fcr-radio-input-wrapper" onClick={onClick}>
        <input
          name={name}
          {...inputProps}
          onClick={(e) => {
            e.stopPropagation();
          }}
          checked={(groupContext?.value ?? null) === value || checked || false}
          onChange={(e) => {
            groupContext?.onChange?.(value);
            onChange?.(e.target.checked);
          }}
          type="radio"></input>
        <span
          className={classnames('fcr-radio-inner', {
            'fcr-btn-click-effect': styleType !== 'transparent',
          })}>
          <SvgImg
            type={SvgIconEnum.FCR_CHECKBOX_CHECK}
            colors={{
              iconPrimary: styleType !== 'white' ? colors['white'] : colors['brand'][6],
            }}
            size={10}></SvgImg>
        </span>
      </span>
      <span className="fcr-radio-label" onClick={onClick}>
        {label}
      </span>
    </label>
  );
};
interface RadioGroupProps<V> {
  defaultValue?: any;
  name?: string;
  options?: RadioProps[];
  value?: V;
  onChange?: (value?: V) => void;
}
const RadioGroupContext = createContext<RadioGroupProps<any> | null>(null);
export const RadioGroup = <V,>(props: React.PropsWithChildren<RadioGroupProps<V>>) => {
  const { children, options, defaultValue } = props;
  const [value, setValue] = useState<V>(defaultValue || props.value);
  useEffect(() => {
    props.value && setValue(props.value);
  }, [props.value]);
  const onRadioChange = (value?: V) => {
    if (!props.value) {
      value && setValue(value);
    }
    props.onChange?.(value);
  };
  return (
    <RadioGroupContext.Provider value={{ ...props, value, onChange: onRadioChange }}>
      {options
        ? options.map((props) => {
            return <Radio key={props.value || uuid()} {...props}></Radio>;
          })
        : children}
    </RadioGroupContext.Provider>
  );
};
