import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 12.8L12.9149 32H35.0851L24 12.8ZM25.3856 8.8C24.7698 7.73333 23.2302 7.73333 22.6144 8.8L8.75795 32.8C8.1421 33.8667 8.9119 35.2 10.1436 35.2H37.8564C39.0881 35.2 39.8579 33.8667 39.242 32.8L25.3856 8.8Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
