import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      d="M7 11L24 20"
      stroke={iconPrimary}
      fill="transparent"
      strokeWidth="3"
      strokeLinecap="square"></path>
  </g>
);
export const viewBox = '0 0 30 30';
