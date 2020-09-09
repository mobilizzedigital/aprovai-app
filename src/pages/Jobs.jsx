import React from 'react';

import ROUTES from '../routes';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import JobsList from '../modules/Job/JobsList';

const JobsPage = () => {
  usePageTitle('Jobs');

  return (
    <div>
      <Breadcrumb items={[{ title: 'Jobs', url: ROUTES.jobs }]} />
      <JobsList />
    </div>
  );
};

export default JobsPage;
