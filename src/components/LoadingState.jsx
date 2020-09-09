import React from 'react';

import { cn } from '../utils';

const LoadingState = ({ shadow, message = 'Loading...' }) => (
  <div
    className={cn([
      'p-3',
      'bg-light',
      'rounded',
      'text-center',
      shadow ? 'shadow' : ''
    ])}
  >
    {message}
  </div>
);

export default LoadingState;
