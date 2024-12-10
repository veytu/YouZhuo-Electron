import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary, iconSecondary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.3482 11.2754C24.4968 11.3442 24.6173 11.4557 24.6916 11.5932L28.8 19.2002H19.2L23.3174 11.5928C23.5073 11.242 23.9688 11.0999 24.3482 11.2754ZM31.4709 24.0002L36.8 34.0007V38.0004C36.8 39.1048 35.8449 40.0002 34.6667 40.0002H13.3333C12.1551 40.0002 11.2 39.1048 11.2 38.0004V34.0007L16.5376 24.0002H31.4709Z"
      fill={iconPrimary}
    />
    <path d="M30.4 8.7998H28V13.5998H30.4H38.4H40.8V8.7998H38.4H30.4Z" fill={iconSecondary} />
  </g>
);
export const viewBox = '0 0 48 48';
