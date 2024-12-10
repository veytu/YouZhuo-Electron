import React from 'react';
import { Meta } from '@storybook/react';
import { SvgIconEnum } from './type';
import { SvgImg } from '.';
import { ClickableIcon, PretestDeviceIcon } from './clickable-icon';
import { MicrophoneIndicator } from './mic';
const meta: Meta = {
  title: 'Components/SvgImg',
  component: SvgImg,
};

type DocsProps = {
  size: number;
  color: string;
};

const keys = Object.keys(SvgIconEnum);
export const Docs = ({ size, color }: DocsProps) => {
  return (
    <div>
      <h1>Mic Icon</h1>

      <MicrophoneIndicator></MicrophoneIndicator>
      <h1>Icon Gallery</h1>
      <div
        style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
        {keys.map((k) => {
          return (
            <div
              key={k}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgImg
                type={SvgIconEnum[k]}
                size={size}
                colors={color ? { iconPrimary: color, penColor: 'red' } : { penColor: 'red' }}
              />
              <div>{(SvgIconEnum[k] as string).replace('fcr_', '')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Docs.args = {
  size: 24,
  color: '',
};

export default meta;

export const Clickable = ({ disabled }: { disabled: boolean }) => {
  return (
    <div>
      <h1>Clickable Icon</h1>
      <div
        style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
        <ClickableIcon disabled={disabled} icon={SvgIconEnum.FCR_CLOSE}></ClickableIcon>
        <PretestDeviceIcon
          tooltip=""
          disabled={disabled}
          status="active"
          icon={SvgIconEnum.FCR_CAMERA}></PretestDeviceIcon>
        <PretestDeviceIcon
          tooltip=""
          disabled={disabled}
          status="inactive"
          icon={SvgIconEnum.FCR_CAMERA}></PretestDeviceIcon>
        <PretestDeviceIcon
          tooltip=""
          disabled={disabled}
          status="idle"
          icon={SvgIconEnum.FCR_CAMERA}></PretestDeviceIcon>
      </div>
    </div>
  );
};
Clickable.argTypes = {
  disabled: {
    control: 'boolean',
    defaultValue: false,
  },
};
