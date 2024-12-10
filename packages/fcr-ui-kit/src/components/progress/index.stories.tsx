import React from 'react';
import { Meta } from '@storybook/react';
import { Progress } from '.';

const meta: Meta = {
  title: 'Components/Progress',
};

export const Docs = () => {
  return (
    <>
      <Progress percent={2}></Progress>
    </>
  );
};

export default meta;
