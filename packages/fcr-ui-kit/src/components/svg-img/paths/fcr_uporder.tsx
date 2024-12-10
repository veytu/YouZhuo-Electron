import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      d="M2.2929 7.29289C1.90237 7.68342 1.90237 8.31658 2.2929 8.70711C2.68342 9.09763 3.31659 9.09763 3.70711 8.70711L6 6.41421L6 26C6 26.5523 6.44772 27 7 27C7.55229 27 8 26.5523 8 26L8 6.41421L10.2929 8.70711C10.6834 9.09763 11.3166 9.09763 11.7071 8.70711C12.0976 8.31658 12.0976 7.68342 11.7071 7.29289L7 2.58579L2.2929 7.29289Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 14 30';
