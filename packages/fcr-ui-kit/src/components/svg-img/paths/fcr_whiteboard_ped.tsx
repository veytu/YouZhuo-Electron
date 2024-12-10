import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.1546 13.7626L14.6768 24.1832L24.4044 33.9108L34.8306 30.4386L37.6099 27.6592C38.3774 26.8918 38.3774 25.6474 37.6099 24.8799L23.7133 10.9833C22.9458 10.2158 21.7014 10.2158 20.934 10.9833L18.1546 13.7626ZM10.3117 37.2821C10.2579 37.4435 10.2578 37.6179 10.3115 37.7793C10.4487 38.1912 10.8938 38.414 11.3057 38.2768L20.2384 35.3031L13.2915 28.3562L10.3117 37.2821Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';
