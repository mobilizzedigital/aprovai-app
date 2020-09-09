import React from 'react';

import UserDetails from '../../modules/Account/UserDetails';
import UserPlan from '../../modules/Account/UserPlan';
import UserClients from '../../modules/Account/UserClients';
import AdminWrapper from '../../modules/AdminWrapper';

const MyAccountPage = () => {
  return (
    <>
      <UserDetails />
      <AdminWrapper>
        <UserPlan />
        <UserClients />
      </AdminWrapper>
    </>
  );
};

export default MyAccountPage;
