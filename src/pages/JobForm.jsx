import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ROUTES from '../routes';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import JobForm from '../modules/Jobs/JobForm';
import Page from '../components/Page';
import { urlParamsToObject } from '../utils';

const JobFormPage = () => {
  const { search } = useLocation();
  const { id } = useParams();
  const { name, type, client } = urlParamsToObject(search);
  const pageTitle = id ? 'Editar Job' : 'Adicionar Job';

  usePageTitle(pageTitle);

  return (
    <>
      <Breadcrumb
        items={[{ title: pageTitle, url: ROUTES.addJob }]}
        expanded={false}
      />
      <Page light>
        <JobForm id={id} name={name} type={type} client={client} />
      </Page>
    </>
  );
};

export default JobFormPage;
