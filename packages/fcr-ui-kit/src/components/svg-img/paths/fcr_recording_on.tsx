import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36.3 24C36.3 30.7931 30.7931 36.3 24 36.3C17.2069 36.3 11.7 30.7931 11.7 24C11.7 17.2069 17.2069 11.7 24 11.7C30.7931 11.7 36.3 17.2069 36.3 24ZM39 24C39 32.2843 32.2843 39 24 39C15.7157 39 9 32.2843 9 24C9 15.7157 15.7157 9 24 9C32.2843 9 39 15.7157 39 24ZM24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
