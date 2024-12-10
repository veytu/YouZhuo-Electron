import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InputNumber } from '.';

const meta: ComponentMeta<typeof InputNumber> = {
  title: 'Components/InputNumber',
  component: InputNumber,
  args: {
    placeholder: 'please set number',
    min: -5,
    max: 130,
    value: 120
  },
};

export const Docs: ComponentStory<typeof InputNumber> = (props) => {
  return (
    <div>
      <div
        style={{
          width: 200,
          marginBottom: 50,
        }}>
        <InputNumber {...props} size="large" />
      </div>
      <div
        style={{
          width: 200,
          marginBottom: 50,
        }}>
        <InputNumber {...props} size="medium" />
      </div>
      <div
        style={{
          width: 46,
          marginBottom: 50,
        }}>
        <InputNumber {...props} size="small" />
      </div>
      <div
        style={{
          width: 46,
          marginBottom: 50,
        }}>
        <InputNumber {...props} size="small" disabled />
      </div>
    </div>
  );
};

export default meta;
