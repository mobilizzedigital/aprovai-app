import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import { userSelector } from '../store';
import { UserAPI } from '../api';
import ROUTES from '../routes';

const PageHeader = ({ onClickCreateJob }) => {
  const [loggedOut, setLoggedOut] = useState(false);
  const user = useSelector(userSelector);

  const logout = async () => {
    try {
      await UserAPI.logout();
      localStorage.removeItem('aprovaai_user_token');
      setLoggedOut(true);
    } catch (error) {}
  };

  if (loggedOut) {
    return <Redirect to={ROUTES.login} />;
  }

  return (
    <Header
      onClickCreateJob={onClickCreateJob}
      onLogout={logout}
      user={user || {}}
    />
  );
};

export default PageHeader;
