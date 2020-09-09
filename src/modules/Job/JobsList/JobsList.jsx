import React from 'react';
import { Container } from 'react-bootstrap';

import SearchBar from '../../../components/SearchBar';
import JobsListTable from '../../../components/JobsListTable';
import Pagination from '../../../components/Pagination';

const JobsList = ({
  term,
  handleSearch,
  jobs,
  loading,
  handleNextPage,
  handlePrevPage,
  perPage,
  page,
  total,
  setPerPage
}) => (
  <Container>
    <SearchBar title="Jobs" value={term} onChange={handleSearch} />
    <JobsListTable jobs={jobs} loading={loading} />
    <Pagination
      perPage={perPage}
      page={page}
      total={total}
      onChangePerPage={setPerPage}
      onNextPage={handleNextPage}
      onPrevPage={handlePrevPage}
    />
  </Container>
);

export default JobsList;
