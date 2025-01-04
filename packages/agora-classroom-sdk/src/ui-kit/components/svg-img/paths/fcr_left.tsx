import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <g clipPath="url(#clip0_3971_62378)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.0607 11.9393C20.6464 12.5251 20.6464 13.4749 20.0607 14.0607L10.4749 23.6464C10.2796 23.8417 10.2796 24.1583 10.4749 24.3536L20.0607 33.9393C20.6464 34.5251 20.6464 35.4749 20.0607 36.0607C19.4749 36.6464 18.5251 36.6464 17.9393 36.0607L8.35355 26.4749C6.98672 25.108 6.98672 22.892 8.35355 21.5251L17.9393 11.9393C18.5251 11.3536 19.4749 11.3536 20.0607 11.9393Z"
        fill={iconPrimary}></path>
    </g>
    <defs>
      <clipPath id="clip0_3971_62378">
        <rect width="48" height="30" fill="white" transform="translate(30) rotate(90)"></rect>
      </clipPath>
    </defs>
  </g>
);
export const viewBox = '0 0 30 48';
