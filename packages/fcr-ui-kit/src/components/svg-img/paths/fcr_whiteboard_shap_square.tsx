import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 12.8001H16C14.2327 12.8001 12.8 14.2328 12.8 16.0001V32.0001C12.8 33.7674 14.2327 35.2001 16 35.2001H32C33.7673 35.2001 35.2 33.7674 35.2 32.0001V16.0001C35.2 14.2328 33.7673 12.8001 32 12.8001ZM16 9.6001C12.4654 9.6001 9.59998 12.4655 9.59998 16.0001V32.0001C9.59998 35.5347 12.4654 38.4001 16 38.4001H32C35.5346 38.4001 38.4 35.5347 38.4 32.0001V16.0001C38.4 12.4655 35.5346 9.6001 32 9.6001H16Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
