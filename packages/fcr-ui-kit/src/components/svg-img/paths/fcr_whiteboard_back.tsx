import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      d="M18.3529 12L21 14.7068L17.8235 17.9549H30.1765C35.1176 17.9549 39 21.9248 39 26.9774C39 32.0301 35.1176 36 30.1765 36H14.2941V32.391H30.1765C33.1765 32.391 35.4706 30.0451 35.4706 26.9774C35.4706 23.9098 33.1765 21.5639 30.1765 21.5639H9L18.3529 12V12Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
