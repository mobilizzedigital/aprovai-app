import React from 'react';

import usePageTitle from '../hooks/usePageTitle';
import RegisterForm from '../modules/Account/RegisterForm';
import UserAccountWrapper from '../components/UserAccountWrapper';

const RegisterPage = () => {
  usePageTitle('Register');

  return (
    <UserAccountWrapper>
      <RegisterForm />
    </UserAccountWrapper>
  );
};

export default RegisterPage;
