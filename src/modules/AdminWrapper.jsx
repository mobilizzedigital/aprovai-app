import React from 'react';
import { useSelector } from 'react-redux';

import { userSelector } from '../store';

const AdminWrapper = ({ children }) => {
  const user = useSelector(userSelector);

  if (!user.isAdmin) return null;

  return <>{children}</>;
};

export default AdminWrapper;
