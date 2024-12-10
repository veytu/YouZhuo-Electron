import React, { ReactNode } from 'react';
import { Meta } from '@storybook/react';
import { Button, ButtonProps } from '.';
import { SvgIconEnum } from '../svg-img';
const meta: Meta = {
  title: 'Components/Button',
};
const sizes = ['XL', 'L', 'M', 'S', 'XS', 'XXS'];
export const Doc = (props: ButtonProps & { text: ReactNode }) => {
  const { text, type, shape, preIcon, postIcon, disabled, styleType, loading, extra, ...others } =
    props;
  return (
    <div>
      <div>
        <h3>type</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button styleType="danger" type="primary">
            primary
          </Button>
          <Button type="secondary">secondary</Button>
          <Button type="text">text</Button>
          <Button type="link">link</Button>
        </div>
      </div>
      <div>
        <h3>shape</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button shape="circle">circle</Button>
          <Button shape="rounded">rounded</Button>
        </div>
      </div>
      <div>
        <h3>Size</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sizes.map((size) => {
            return (
              <Button
                onClick={() => {
                  console.log('click');
                }}
                extra={extra}
                key={size}
                size={size as 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS'}
                loading={loading}
                disabled={disabled}
                type={type}
                shape={shape}
                preIcon={preIcon && SvgIconEnum.FCR_HOST}
                postIcon={postIcon && SvgIconEnum.FCR_HOST}
                styleType={styleType}
                {...others}>
                {text}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
Doc.argTypes = {
  text: {
    control: 'text',
    defaultValue: 'text',
  },
  type: {
    control: 'radio',
    options: ['primary', 'secondary', 'text', 'link'],
    defaultValue: 'primary',
  },
  shape: {
    control: 'radio',
    options: ['circle', 'rounded'],
    defaultValue: 'circle',
  },
  loading: {
    control: 'boolean',

    defaultValue: false,
  },
  preIcon: {
    control: 'boolean',

    defaultValue: false,
  },
  postIcon: {
    control: 'boolean',

    defaultValue: false,
  },
  disabled: {
    control: 'boolean',

    defaultValue: false,
  },
  styleType: {
    control: 'radio',
    options: ['danger', 'gray', 'white'],
  },
  extra: {
    control: 'text',
    defaultValue: '',
  },
};
export default meta;
