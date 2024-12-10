import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Switch } from '.';

const meta: ComponentMeta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    // labels: { on: 'ON', off: 'OFF' },
  },
};

export const Docs: ComponentStory<typeof Switch> = (props) => {
  return (
    <div>
      <div
        style={{
          width: 200,
          marginBottom: 50,
        }}>
        <Switch {...props} />
      </div>
    </div>
  );
};

export default meta;
