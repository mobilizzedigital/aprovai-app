import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '../utils';
import StatusIcon from './StatusIcon';

const Stats = ({
  status,
  label,
  value,
  column = false,
  bordered = false,
  link,
}) => {
  const content = (
    <div
      className={cn([
        'stats',
        'bg-light',
        'shadow',
        'rounded',
        'd-flex',
        'align-items-center',
        'mb-3',
        'mb-md-4',
        'w-100',
        column ? 'flex-column p-3' : 'flex-row py-2 px-3',
        bordered ? 'stats-bordered' : '',
        `stats-${status.replace(' ', '-').toLowerCase()}`,
      ])}
    >
      <StatusIcon status={status} size={40} />
      <span className={cn(['stats-value', !column ? 'mx-2 mx-md-3' : ''])}>
        {value}
      </span>
      <span className={cn(['stats-label', column ? 'text-center' : ''])}>
        {label}
      </span>
    </div>
  );

  if (link) {
    return (
      <Link className="text-decoration-none d-flex w-100" to={link}>
        {content}
      </Link>
    );
  }

  return content;
};

export default Stats;
