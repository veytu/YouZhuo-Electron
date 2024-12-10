import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Radio, RadioGroup } from '.';

const meta: Meta = {
  title: 'Components/Radio',
};

export const Docs = () => {
  return (
    <>
      <RadioGroup
        defaultValue={'a'}
        onChange={(value) => {
          console.log(value);
        }}>
        <Radio value="a" label="Agree terms of service"></Radio>
        <Radio value="b" styleType="white" label="Agree terms of service"></Radio>
        <Radio value="b" styleType="transparent" label="Agree terms of service"></Radio>
      </RadioGroup>
    </>
  );
};

export default meta;
