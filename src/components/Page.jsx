import React from 'react';

import { cn } from '../utils';

const Page = ({ children, light = false }) => (
  <main className={cn(['page', 'py-4', 'py-md-5', light ? 'bg-light' : ''])}>
    {children}
  </main>
);

export default Page;
