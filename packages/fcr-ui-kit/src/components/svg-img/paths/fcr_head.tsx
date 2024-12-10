import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      d="M24 24.4014C28.6383 24.4014 32.3979 20.7301 32.3979 16.2007C32.3979 11.6713 28.6383 8 24 8C19.3617 8 15.6021 11.6713 15.6021 16.2007C15.6021 20.7301 19.3617 24.4014 24 24.4014ZM24 28.2284C16.2683 28.2284 10 30.6401 10 33.6125C10 36.5848 16.2683 39 24 39C31.7317 39 38 36.5882 38 33.6159C38 30.6436 31.7317 28.2284 24 28.2284Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
