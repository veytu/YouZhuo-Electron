import React from 'react';
import { DoubleDeckPopover, Popover } from '.';
import { Button } from '../button';

export default {
  title: 'Components/Popover',
};
export const Docs = () => {
  return (
    <div>
      <Popover showArrow trigger="click" content={'123'} placement="bottom">
        <Button size="XS">FcrPopover</Button>
      </Popover>
      <DoubleDeckPopover trigger="click">
        <Button size="XS">FcrDoubleDeckPopover</Button>
      </DoubleDeckPopover>
    </div>
  );
};
Docs.argTypes = {};
