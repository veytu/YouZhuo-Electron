import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0148 24.8458C14.5475 24.3007 14.6106 23.48 15.1558 23.0127L20.5613 18.3794C20.7941 18.1799 20.7941 17.8197 20.5613 17.6202L15.1558 12.9868C14.6106 12.5196 14.5475 11.6989 15.0148 11.1538C15.482 10.6086 16.3027 10.5455 16.8478 11.0127L22.2534 15.6461C23.6968 16.8833 23.6968 19.1163 22.2534 20.3535L16.8478 24.9868C16.3027 25.4541 15.482 25.3909 15.0148 24.8458Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 36 36';
