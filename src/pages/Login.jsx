import React from 'react';

import usePageTitle from '../hooks/usePageTitle';
import LoginForm from '../modules/Account/LoginForm';
import UserAccountWrapper from '../components/UserAccountWrapper';

const LoginPage = () => {
  usePageTitle('Login');

  return (
    <UserAccountWrapper>
      <LoginForm />
    </UserAccountWrapper>
  );
};

export default LoginPage;
