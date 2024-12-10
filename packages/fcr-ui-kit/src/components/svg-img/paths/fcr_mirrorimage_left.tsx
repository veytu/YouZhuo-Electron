import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.61802 36.9998C8.87464 36.9998 8.39114 36.2175 8.72359 35.5526L21.1056 10.7887C21.5775 9.84484 23 10.1806 23 11.2359V35.9998C23 36.5521 22.5523 36.9998 22 36.9998H9.61802ZM12.5305 34.1998L20.2 18.8608V34.1998H12.5305ZM25 11.2359V35.9998C25 36.5521 25.4477 36.9998 26 36.9998H38.3819C39.1253 36.9998 39.6088 36.2175 39.2764 35.5526L26.8944 10.7887C26.4225 9.84484 25 10.1806 25 11.2359Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
