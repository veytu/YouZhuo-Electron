import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <rect
      x="5.73047"
      y="5.73047"
      width="10.5417"
      height="10.5417"
      rx="2.0625"
      stroke={iconPrimary}
      fill="transparent"
      strokeWidth="1.375"></rect>
    <rect x="6.875" y="6.875" width="5.95833" height="8.25" rx="0.916667" fill={iconPrimary}></rect>
  </g>
);
export const viewBox = '0 0 22 22';
