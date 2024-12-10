import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36.0607 20.0607C35.4749 20.6464 34.5251 20.6464 33.9393 20.0607L24.3536 10.4749C24.1583 10.2796 23.8417 10.2796 23.6464 10.4749L14.0607 20.0607C13.4749 20.6464 12.5251 20.6464 11.9393 20.0607C11.3536 19.4749 11.3536 18.5251 11.9393 17.9393L21.5251 8.35356C22.892 6.98672 25.108 6.98672 26.4749 8.35356L36.0607 17.9393C36.6464 18.5251 36.6464 19.4749 36.0607 20.0607Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 30';
