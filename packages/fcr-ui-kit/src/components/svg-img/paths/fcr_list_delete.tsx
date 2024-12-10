import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
      fill={iconPrimary}></path>
    <path
      d="M8.5 12.25C8.5 11.8358 8.83579 11.5 9.25 11.5H14.75C15.1642 11.5 15.5 11.8358 15.5 12.25C15.5 12.6642 15.1642 13 14.75 13H9.25C8.83579 13 8.5 12.6642 8.5 12.25Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 24 24';
