import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.9852 11.1542C21.4525 11.6993 21.3894 12.52 20.8442 12.9873L15.4387 17.6206C15.2059 17.8201 15.2059 18.1803 15.4387 18.3798L20.8442 23.0132C21.3894 23.4804 21.4525 24.3011 20.9852 24.8462C20.518 25.3914 19.6973 25.4545 19.1522 24.9873L13.7466 20.3539C12.3032 19.1167 12.3032 16.8837 13.7466 15.6465L19.1522 11.0132C19.6973 10.5459 20.518 10.6091 20.9852 11.1542Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 36 36';
