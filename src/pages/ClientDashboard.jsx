import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ROUTES from '../routes';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import ClientDashboard from '../modules/Client/ClientDashboard';
import { getClientDashboardRoute } from '../routes';

const ClientDashboardPage = () => {
  const [title, setTitle] = useState('');
  const { id } = useParams();

  usePageTitle(title);

  const breadcrumb = [
    { title: 'Clientes', url: ROUTES.clients },
    { title: title, url: getClientDashboardRoute(id) }
  ];

  const handleSetPageTitle = title => setTitle(title);

  return (
    <>
      <Breadcrumb items={breadcrumb} expanded={false} />
      <main>
        <ClientDashboard id={id} setPageTitle={handleSetPageTitle} />
      </main>
    </>
  );
};

export default ClientDashboardPage;
