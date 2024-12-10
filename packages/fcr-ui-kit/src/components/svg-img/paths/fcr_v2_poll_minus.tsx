import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M18 34C9.16344 34 2 26.8366 2 18C2 9.16344 9.16344 2 18 2C26.8366 2 34 9.16344 34 18C34 26.8366 26.8366 34 18 34ZM0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18ZM12.25 17C11.5596 17 11 17.5596 11 18.25C11 18.9404 11.5596 19.5 12.25 19.5H23.75C24.4404 19.5 25 18.9404 25 18.25C25 17.5596 24.4404 17 23.75 17H12.25Z"
    fill={iconPrimary}
  />
);
export const viewBox = '0 0 36 36';
