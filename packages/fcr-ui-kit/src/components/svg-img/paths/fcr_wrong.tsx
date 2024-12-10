import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <g clipPath="url(#clip0_11846_103405)">
      <rect
        width="26.6233"
        height="4.03384"
        rx="2.01692"
        transform="matrix(0.70542 -0.70879 0.70542 0.70879 13 31.8701)"
        fill={iconPrimary}></rect>
      <rect
        width="26.6233"
        height="4.03384"
        rx="2.01692"
        transform="matrix(0.70542 0.708789 -0.70542 0.708789 16.2194 13.2705)"
        fill={iconPrimary}></rect>
    </g>
    <defs>
      <clipPath id="clip0_11846_103405">
        <rect width="22" height="22" fill="white" transform="translate(13 13)"></rect>
      </clipPath>
    </defs>
  </g>
);
export const viewBox = '0 0 48 48';
