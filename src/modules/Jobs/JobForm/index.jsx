import React from 'react';

import Form from './JobForm';
import useGetClients from '../../../hooks/useGetClients';
// import { getCarouselId } from '../../../api/jobs';
import { JobFormContextProvider, JobViewContextProvider } from './context';

const JobForm = () => {
  const { clients } = useGetClients(100);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { carrouselId } = await getCarouselId();
  //   };
  //   fetchData();
  // }, []);

  return (
    <JobFormContextProvider clients={clients}>
      <JobViewContextProvider>
        <Form />
      </JobViewContextProvider>
    </JobFormContextProvider>
  );
};

export default JobForm;
