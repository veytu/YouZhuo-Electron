import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from '.';
import { SvgIconEnum } from '../svg-img';

const meta: ComponentMeta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'please input room name',
  },
};

export const Docs: ComponentStory<typeof Input> = (props) => {
  const [value, setValue] = useState('');
  const handleChange = (val: string) => {
    setValue(val);
  };
  return (
    <div>
      <div
        style={{
          width: 200,
          marginBottom: 50,
        }}>
        <Input
          {...props}
          label={'Name'}
          iconPrefix={SvgIconEnum.FCR_V2_SEARCH}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          width: 200,
          marginBottom: 50,
        }}>
        <Input {...props} label={'Room'} size="large" value={value} onChange={handleChange} />
      </div>
      <div
        style={{
          width: 200,
          marginBottom: 50,
        }}>
        <Input {...props} label={'Disabled'} size="large" disabled />
      </div>
    </div>
  );
};

export default meta;
