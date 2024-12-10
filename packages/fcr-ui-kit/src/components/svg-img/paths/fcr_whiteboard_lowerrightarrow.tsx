import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      d="M3.06667 4C3.58213 4 4 3.58213 4 3.06667V0L0 4H3.06667Z"
      fill={iconPrimary || 'white'}></path>
  </g>
);
export const viewBox = '0 0 4 4';
