import React from 'react';

import usePageTitle from '../hooks/usePageTitle';
import ForgotPasswordForm from '../modules/Account/ForgotPasswordForm';
import UserAccountWrapper from '../components/UserAccountWrapper';

const ForgotPasswordPage = () => {
  usePageTitle('Forgot Password');

  return (
    <UserAccountWrapper>
      <ForgotPasswordForm />
    </UserAccountWrapper>
  );
};

export default ForgotPasswordPage;
