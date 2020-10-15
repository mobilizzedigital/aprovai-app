import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ROUTES, { getJobDashboardRoute } from '../routes';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import JobDashboard from '../modules/Job/JobDashboard';
import { userSelector } from '../store';

const JobDashboardPage = () => {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const user = useSelector(userSelector);

  usePageTitle(title);

  const handleSetPageTitle = title => setTitle(title);

  const breadcrumb = [];

  if (user.isAdmin) {
    breadcrumb.push({ title: 'Jobs', url: ROUTES.jobs });
  }

  breadcrumb.push({ title, url: getJobDashboardRoute(id) });

  return (
    <>
      <Breadcrumb items={breadcrumb} expanded={false} />
      <JobDashboard id={id} setPageTitle={handleSetPageTitle} />
    </>
  );
};

export default JobDashboardPage;
