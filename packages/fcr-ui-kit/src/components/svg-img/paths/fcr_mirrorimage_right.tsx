import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <g clipPath="url(#clip0_3870_58442)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 12.2359V36.9998C23 37.5521 22.5523 37.9998 22 37.9998H9.61805C8.87467 37.9998 8.39117 37.2175 8.72362 36.5526L21.1056 11.7887C21.5775 10.8448 23 11.1806 23 12.2359ZM27.8 13.5998L27.5702 13.1402L27.1181 12.2359L26.8944 11.7887C26.4225 10.8448 25 11.1806 25 12.2359V12.7359V13.7469V14.2608V36.9998C25 37.5521 25.4477 37.9998 26 37.9998H38.382C39.1254 37.9998 39.6089 37.2175 39.2764 36.5526L27.8 13.5998ZM35.4695 35.1998L27.8 19.8608V35.1998H35.4695Z"
        fill={iconPrimary}></path>
    </g>
    <defs>
      <clipPath id="clip0_3870_58442">
        <rect width="48" height="48" fill="white"></rect>
      </clipPath>
    </defs>
  </g>
);
export const viewBox = '0 0 48 48';
