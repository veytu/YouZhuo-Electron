import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.4001 11.2002H35.2001C36.0837 11.2002 36.8001 11.9165 36.8001 12.8002V24.8002H33.6001V16.6629L15.5314 34.7316C14.9066 35.3564 13.8935 35.3564 13.2687 34.7316C12.6438 34.1067 12.6438 33.0937 13.2687 32.4688L31.3373 14.4002H22.4001V11.2002Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
