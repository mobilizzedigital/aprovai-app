import React from 'react';

const Section = ({ title, children, height }) => (
  <section className="mb-4">
    <span className="font-weight-medium">{title}</span>
    <div
      className="mt-1 overflow-auto pr-4"
      style={{ height: height || 'auto', width: 'calc(100% + 1.5rem)' }}
    >
      {children}
    </div>
  </section>
);

export default Section;
