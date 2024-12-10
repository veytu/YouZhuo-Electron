import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      d="M38 2L43 5H39H3C3 5.55228 2.55228 6 2 6C1.44772 6 1 5.55228 1 5C1 4.44772 1.44772 4 2 4C2.55228 4 3 4.44772 3 5H39L38 2Z"
      fill={iconPrimary}></path>
    <path
      d="M3 5H39M3 5V5C3 4.44772 2.55228 4 2 4V4C1.44772 4 1 4.44772 1 5V5C1 5.55228 1.44772 6 2 6V6C2.55228 6 3 5.55228 3 5V5ZM39 5H43L38 2L39 5Z"
      stroke={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 45 7';
