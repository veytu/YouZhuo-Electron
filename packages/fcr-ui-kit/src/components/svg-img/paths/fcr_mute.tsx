import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary, iconSecondary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 12C20.6863 12 18 14.6863 18 18V26C18 29.3137 20.6863 32 24 32C27.3137 32 30 29.3137 30 26V18C30 14.6863 27.3137 12 24 12ZM16.4001 23C16.4001 22.2268 15.7733 21.6 15.0001 21.6C14.2269 21.6 13.6001 22.2268 13.6001 23V26C13.6001 31.7437 18.2563 36.4 24.0001 36.4C29.7439 36.4 34.4001 31.7437 34.4001 26V23C34.4001 22.2268 33.7733 21.6 33.0001 21.6C32.2269 21.6 31.6001 22.2268 31.6001 23V26C31.6001 30.1973 28.1975 33.6 24.0001 33.6C19.8027 33.6 16.4001 30.1973 16.4001 26V23Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
