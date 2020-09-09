import React from 'react';
import { useSelector } from 'react-redux';

import Avatar from './Avatar';
import { userSelector } from '../store';

const DEFAULT_IMAGE = '/images/avatar.jpg';

const UserAvatar = ({ src, ...props }) => {
  const user = useSelector(userSelector);
  let avatar = src || DEFAULT_IMAGE;

  if (!user.isAdmin && !avatar && user.companyLogo) {
    avatar = user.companyLogo;
  }

  return <Avatar src={avatar} {...props} />;
};

export default UserAvatar;
