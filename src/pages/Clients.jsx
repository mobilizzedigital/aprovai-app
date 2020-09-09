import React from 'react';

import ROUTES from '../routes';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import ClientsList from '../modules/Client/ClientsList';

const ClientsPage = () => {
  usePageTitle('Clientes');

  return (
    <>
      <Breadcrumb items={[{ title: 'Clientes', url: ROUTES.clients }]} />
      <ClientsList />
    </>
  );
};

export default ClientsPage;
