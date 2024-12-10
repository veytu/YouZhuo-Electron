import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      d="M29.6471 12L27 14.7068L30.1765 17.9549L17.8235 17.9549C12.8824 17.9549 9 21.9248 9 26.9774C9 32.0301 12.8824 36 17.8235 36L33.7059 36L33.7059 32.391L17.8235 32.391C14.8235 32.391 12.5294 30.0451 12.5294 26.9774C12.5294 23.9098 14.8235 21.5639 17.8235 21.5639L39 21.5639L29.6471 12V12Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
