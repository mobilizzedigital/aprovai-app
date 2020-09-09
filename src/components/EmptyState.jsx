import React from 'react';

import { cn } from '../utils';

const EmptyState = ({ shadow, text }) => (
  <div
    className={cn([
      'p-3',
      'bg-light',
      'rounded',
      'text-center',
      shadow ? 'shadow' : ''
    ])}
  >
    {text}
  </div>
);

export default EmptyState;
