import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <g clipPath="url(#clip0_3971_62377)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.93934 36.0607C9.35355 35.4749 9.35355 34.5251 9.93934 33.9393L19.5251 24.3536C19.7204 24.1583 19.7204 23.8417 19.5251 23.6464L9.93934 14.0607C9.35355 13.4749 9.35355 12.5251 9.93934 11.9393C10.5251 11.3536 11.4749 11.3536 12.0607 11.9393L21.6464 21.5251C23.0133 22.892 23.0133 25.108 21.6464 26.4749L12.0607 36.0607C11.4749 36.6464 10.5251 36.6464 9.93934 36.0607Z"
        fill={iconPrimary}></path>
    </g>
    <defs>
      <clipPath id="clip0_3971_62377">
        <rect width="48" height="30" fill="white" transform="translate(0 48) rotate(-90)"></rect>
      </clipPath>
    </defs>
  </g>
);
export const viewBox = '0 0 30 48';
