import React from 'react';
import { useParams } from 'react-router-dom';

import ROUTES from '../routes';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import JobReview from '../modules/Job/JobReview';
import Page from '../components/Page';

const JobPackageReview = () => {
  const { id } = useParams();

  usePageTitle(id ? 'Revisar Job' : 'Adicionar Job');

  return (
    <>
      <Breadcrumb
        items={[
          { title: id ? 'Jobs' : 'Adicionar Job', url: ROUTES.addJob },
          { title: 'Revisão', url: '' }
        ]}
        expanded={false}
      />
      <Page light>
        <JobReview id={id} />
      </Page>
    </>
  );
};

export default JobPackageReview;
