import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { VerticalSlider, HorizontalSlider } from '.';

const meta: ComponentMeta<typeof VerticalSlider> = {
  title: 'Components/Slider',
  component: VerticalSlider,
  args: {},
};

export const Docs: ComponentStory<typeof VerticalSlider> = (props) => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <div
        style={{
          width: 200,
          height: 300,
          marginBottom: 50,
        }}>
        <VerticalSlider {...props} value={value} onChange={setValue} />
      </div>
      <div
        style={{
          width: 200,
          height: 300,
          marginBottom: 50,
        }}>
        <HorizontalSlider {...props} value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default meta;
