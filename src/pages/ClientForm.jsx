import React from 'react';
import { useParams } from 'react-router-dom';

import ROUTES from '../routes';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import Page from '../components/Page';
import ClientForm from '../modules/Client/ClientForm';

const ClientFormPage = () => {
  const { id } = useParams();
  const pageTitle = id ? 'Editar Cliente' : 'Adicionar Cliente';
  const breadcrumb = [{ title: pageTitle, url: ROUTES.addClient }];

  usePageTitle(pageTitle);

  return (
    <>
      <Breadcrumb items={breadcrumb} expanded={false} />
      <Page>
        <ClientForm id={id} />
      </Page>
    </>
  );
};

export default ClientFormPage;
