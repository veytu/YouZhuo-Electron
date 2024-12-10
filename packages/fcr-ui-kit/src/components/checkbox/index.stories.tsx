import React from 'react';
import { Meta } from '@storybook/react';
import { Checkbox } from '.';

const meta: Meta = {
  title: 'Components/Checkbox',
};

export const Docs = () => {
  return (
    <>
      <div>
        <Checkbox size="small" label="Agree terms of service"></Checkbox>
      </div>
      <div>
        <Checkbox styleType="white" label="Agree terms of service"></Checkbox>
      </div>
      <div>
        <Checkbox styleType="white" indeterminate label="Agree terms of service"></Checkbox>
      </div>
    </>
  );
};

export default meta;
