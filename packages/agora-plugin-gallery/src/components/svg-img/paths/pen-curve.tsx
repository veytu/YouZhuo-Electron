import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary, penColor }: PathOptions) =>
    <g fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.77365 19.2235C6.74631 19.1414 6.74634 19.0527 6.77373 18.9706L8.28997 14.4288L11.8248 17.9636L7.27953 19.4767C7.06992 19.5465 6.84343 19.4331 6.77365 19.2235Z" fill={penColor ?? iconPrimary} />
        <path fillRule="evenodd" clipRule="evenodd" d="M8.99494 12.3053L10.7646 7.00295L12.1788 5.58874C12.5693 5.19821 13.2025 5.19821 13.593 5.58874L20.6641 12.6598C21.0546 13.0503 21.0546 13.6835 20.6641 14.074L19.2499 15.4882L13.9447 17.255L8.99494 12.3053Z" fill={iconPrimary} />
        <path d="M3 6.62489C3 6.62489 5.26468 7.48426 5.88159 6.37484C6.46593 5.32397 4.83199 4.54208 4.83199 3.84901C4.83199 2.62576 8 3.16496 8 3.16496" stroke={penColor ?? iconPrimary} strokeLinecap="round" />
    </g>




export const viewBox = '0 0 22 24';