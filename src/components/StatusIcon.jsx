import React from 'react';

import { cn } from '../utils';
import Icon from './Icon';

const icons = {
  pendente: Icon.types.hourglass,
  aprovado: Icon.types.checkMark,
  'em-ajuste': Icon.types.settings,
};

const StatusIcon = ({ status, size = 40, className = '' }) => {
  const icon = status.replace(' ', '-').toLowerCase();

  return (
    <span
      className={cn([
        'rounded-circle',
        'd-inline-flex',
        'align-items-center',
        'justify-content-center',
        'status-icon',
        `status-icon-${icon}`,
        className,
      ])}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      <Icon name={icons[icon]} />
    </span>
  );
};

export default StatusIcon;
