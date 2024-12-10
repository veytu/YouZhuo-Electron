import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <rect x="1" y="4" width="8" height="2" rx="1" fill={iconPrimary}></rect>
  </g>
);
export const viewBox = '0 0 10 10';
