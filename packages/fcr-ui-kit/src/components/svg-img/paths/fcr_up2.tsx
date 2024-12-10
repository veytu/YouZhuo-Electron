import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.9406 10.2639C25.0539 9.73184 23.9461 9.73184 23.0594 10.2639L17.6174 13.5291C17.0491 13.8701 16.312 13.6858 15.971 13.1175C15.63 12.5492 15.8143 11.8121 16.3826 11.4711L21.8246 8.20588C23.4714 7.21783 25.5286 7.21783 27.1754 8.20588L32.6174 11.4711C33.1857 11.8121 33.37 12.5492 33.029 13.1175C32.688 13.6858 31.9509 13.8701 31.3826 13.5291L25.9406 10.2639Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 20';
