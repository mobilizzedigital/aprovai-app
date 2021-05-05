import React from 'react';

import { cn } from '../utils';

const Avatar = ({
  src,
  alt = '',
  size = 32,
  circle = false,
  className = '',
}) => {
  const styles = { width: size, height: size, minWidth: size, minHeight: size };
  const classes = cn([
    'avatar',
    'm-0',
    'overflow-hidden',
    circle ? 'rounded-circle' : 'rounded',
    className,
  ]);
  const placeholderImage = `${process.env.PUBLIC_URL}/images/placeholder.svg`;

  return (
    <figure className={classes} style={styles}>
      <img src={src || placeholderImage} alt={alt} />
    </figure>
  );
};

export default Avatar;
