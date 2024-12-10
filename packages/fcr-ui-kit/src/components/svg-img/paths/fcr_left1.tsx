import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <g clipPath="url(#clip0_3794_55345)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2638 22.0594C9.73178 22.9461 9.73178 24.0539 10.2638 24.9406L13.529 30.3826C13.87 30.9509 13.6857 31.688 13.1174 32.029C12.5491 32.37 11.812 32.1857 11.471 31.6174L8.20582 26.1754C7.21777 24.5286 7.21777 22.4714 8.20582 20.8246L11.471 15.3826C11.812 14.8143 12.5491 14.63 13.1174 14.971C13.6857 15.312 13.87 16.0491 13.529 16.6174L10.2638 22.0594Z"
        fill={iconPrimary}></path>
    </g>
    <defs>
      <clipPath id="clip0_3794_55345">
        <rect width="48" height="20" fill="white" transform="translate(0 48) rotate(-90)"></rect>
      </clipPath>
    </defs>
  </g>
);
export const viewBox = '0 0 20 48';
