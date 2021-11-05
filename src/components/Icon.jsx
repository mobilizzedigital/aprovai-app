import React from 'react';

import { cn } from '../utils';

const Icon = ({ name, screenReaderMessage, className = '', size = 16 }) => (
  <span
    className={cn(['icon', `icon-${name}`, className])}
    style={{ fontSize: `${size}px` }}
  >
    {screenReaderMessage && (
      <span className="sr-only">{screenReaderMessage}</span>
    )}
  </span>
);

Icon.types = {
  addUser: 'add-user',
  arrowDown: 'down-arrow',
  bell: 'bell',
  cancel: 'cancel',
  checkMark: 'check-mark',
  delete: 'delete',
  email: 'email',
  eye: 'eye',
  home: 'home',
  hourglass: 'hourglass',
  link: 'link',
  loupe: 'loupe',
  package: 'package',
  paperPlane: 'paper-plane',
  pencil: 'pencil',
  plus: 'plus',
  settings: 'settings',
  warning: 'warning',
  menu: 'menu',
  close: 'close',
  left: 'left-arrow',
  right: 'right-arrow',
};

export default Icon;
