import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import { ToolTip, ToolTipProps } from '.';
import { GuideToolTip } from './guide';
import { InfoToolTip } from './info';
import { DialogToolTip } from './dialog';
const tooltipMap = {
  normal: ToolTip,
  guide: GuideToolTip,
  info: InfoToolTip,
  dialog: DialogToolTip,
};
const meta: Meta = {
  title: 'Components/ToolTip',
};
const placementMap = [
  'left',
  'top',
  'bottom',
  'right',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
];
export const Placement = (
  props: ToolTipProps & {
    children?: React.ReactNode;
    type: keyof typeof tooltipMap;
  },
) => {
  const { type, trigger } = props;
  const Component = tooltipMap[type];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 30,
        padding: 50,
      }}>
      {placementMap.map((placement, index) => {
        return (
          <Component
            key={placement}
            trigger={trigger}
            placement={placement}
            content={placement}
            closable>
            <a
              style={{
                width: 120,
                height: 40,
                textAlign: 'center',
                color: 'blue',
                background: 'gray',
                cursor: 'pointer',
                lineHeight: '40px',
              }}>
              {placement}
            </a>
          </Component>
        );
      })}
    </div>
  );
};
Placement.argTypes = {
  type: {
    control: 'radio',
    options: ['normal', 'guide', 'info'],
    defaultValue: 'normal',
  },
  trigger: {
    control: 'radio',
    options: ['hover', 'click'],
    defaultValue: 'hover',
  },
};
export default meta;

export const Type: ComponentStory<typeof ToolTip> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { trigger } = props;
  return (
    <div
      style={{
        padding: '100px',
        display: 'flex',
        gap: '40px',
        flexDirection: 'row',
      }}>
      <ToolTip trigger={trigger} placement={'top'} content={'关闭摄像头'}>
        <a
          style={{
            width: 120,
            height: 40,
            textAlign: 'center',
            color: 'blue',
            background: 'gray',
            cursor: 'pointer',
            lineHeight: '40px',
          }}>
          normal
        </a>
      </ToolTip>
      <GuideToolTip
        onClose={() => {
          console.log('onClose');
        }}
        trigger={trigger}
        placement={'top'}
        content={'解除禁言'}
        closable>
        <a
          style={{
            width: 120,
            height: 40,
            textAlign: 'center',
            color: 'blue',
            background: 'gray',
            cursor: 'pointer',
            lineHeight: '40px',
          }}>
          guide
        </a>
      </GuideToolTip>
      <InfoToolTip trigger={trigger} placement={'top'} content={'🙋 有1人举手，请点击查看'}>
        <a
          style={{
            width: 120,
            height: 40,
            textAlign: 'center',
            color: 'blue',
            background: 'gray',
            cursor: 'pointer',
            lineHeight: '40px',
          }}>
          info
        </a>
      </InfoToolTip>
      <DialogToolTip
        trigger={trigger}
        placement={'top'}
        content={'🙋 有1人举手，请点击查看'}
        onClose={() => {
          console.log('onClose');
        }}>
        <a
          style={{
            width: 120,
            height: 40,
            textAlign: 'center',
            color: 'blue',
            background: 'gray',
            cursor: 'pointer',
            lineHeight: '40px',
          }}>
          dialog
        </a>
      </DialogToolTip>
    </div>
  );
};
Type.argTypes = {
  trigger: {
    control: 'radio',
    options: ['hover', 'click'],
    defaultValue: 'hover',
  },
};
