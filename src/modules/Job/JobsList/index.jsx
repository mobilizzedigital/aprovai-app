import React, { useState, useEffect } from 'react';

import { JobsAPI } from '../../../api';
import JobsListComponent from './JobsList';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);
  const handleSearch = (e) => setTerm(e.currentTarget.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await JobsAPI.getJobs(
          perPage,
          term !== '' ? 0 : page,
          term
        );

        setJobs(data.projetos);
        setTotal(data.totalRegistros);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [perPage, page, term]);

  return (
    <JobsListComponent
      term={term}
      handleSearch={handleSearch}
      jobs={jobs}
      loading={loading}
      perPage={perPage}
      page={page}
      total={total}
      setPerPage={setPerPage}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
    />
  );
};

export default JobsList;
