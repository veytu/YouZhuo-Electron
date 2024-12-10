import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FashionTabs, Tabs } from '.';

const meta: ComponentMeta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    items: [
      { label: 'Chat', key: 'chat' },
      { label: 'Member(20)', key: 'member' },
    ],
  },
};

export const Docs: ComponentStory<typeof Tabs> = (props) => {
  const [activeKey, setActiveKey] = useState('chat');

  const handleChange = (key: string) => {
    setActiveKey(key);
  };

  const [activeKey1, setActiveKey1] = useState('setting');

  const handleChange1 = (key: string) => {
    setActiveKey1(key);
  };

  return (
    <div>
      <div
        style={{
          width: 400,
          marginBottom: 50,
        }}>
        <Tabs {...props} activeKey={activeKey} onChange={handleChange} />
      </div>
      <div
        style={{
          width: 400,
          marginBottom: 50,
        }}>
        <Tabs {...props} activeKey={activeKey} onChange={handleChange} variant="simple" />
      </div>
      <div
        style={{
          width: 600,
          marginBottom: 50,
        }}>
        <FashionTabs
          items={[
            { label: 'Basic Setting', key: 'setting' },
            { label: 'Background', key: 'background' },
            { label: 'Beauty Filter', key: 'filter' },
          ]}
          activeKey={activeKey1}
          onChange={handleChange1}
        />
      </div>
    </div>
  );
};

export default meta;
