import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <path
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    d="M9.18126 2.2761C9.53491 2.60618 9.55403 3.16045 9.22395 3.51411L4.61898 8.44801C4.13418 8.96743 3.31081 8.96743 2.82601 8.44801L0.651593 6.11827C0.321517 5.76462 0.340629 5.21035 0.694283 4.88027C1.04794 4.55019 1.60221 4.56931 1.93228 4.92296L3.72249 6.84104L7.94326 2.31879C8.27334 1.96514 8.82761 1.94603 9.18126 2.2761Z"
    fill={iconPrimary}
  />
);
export const viewBox = '0 0 10 10';
