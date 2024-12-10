import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      d="M3.33203 6.79088C3.33203 6.34708 3.6918 5.9873 4.1356 5.9873H10.207C12.6233 5.9873 14.582 7.94606 14.582 10.3623C14.582 12.7786 12.6233 14.7373 10.207 14.7373H4.1356C3.6918 14.7373 3.33203 14.3775 3.33203 13.9337V6.79088Z"
      fill="url(#paint0_linear_4376_70861)"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.13139 5.9873C3.69207 5.9873 3.33594 6.34344 3.33594 6.78276V13.9419C3.33594 14.3812 3.69207 14.7373 4.13139 14.7373H7.71094C9.55287 14.7373 11.1289 13.599 11.7741 11.9876L15.4278 14.0399C15.9833 14.352 16.6693 13.9505 16.6693 13.3134V7.46537C16.6693 6.81627 15.96 6.41638 15.4046 6.75235L11.8389 8.90938C11.2398 7.20732 9.61786 5.9873 7.71094 5.9873H4.13139Z"
      fill={iconPrimary}></path>
    <defs>
      <linearGradient
        id="paint0_linear_4376_70861"
        x1="13.8529"
        y1="10.3623"
        x2="3.33203"
        y2="10.3623"
        gradientUnits="userSpaceOnUse">
        <stop stopColor={iconPrimary} stopOpacity="0.82"></stop>
        <stop offset="1" stopColor={iconPrimary} stopOpacity="0"></stop>
      </linearGradient>
    </defs>
  </g>
);
export const viewBox = '0 0 20 21';
