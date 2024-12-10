import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9393 7.93934C12.5251 7.35355 13.4749 7.35355 14.0607 7.93934L23.6464 17.5251C23.8417 17.7204 24.1583 17.7204 24.3536 17.5251L33.9393 7.93934C34.5251 7.35356 35.4749 7.35356 36.0607 7.93934C36.6464 8.52513 36.6464 9.47488 36.0607 10.0607L26.4749 19.6464C25.108 21.0133 22.892 21.0133 21.5251 19.6464L11.9393 10.0607C11.3536 9.47487 11.3536 8.52513 11.9393 7.93934Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 30';
