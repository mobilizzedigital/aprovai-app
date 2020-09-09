import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Icon from '../../../components/Icon';
import SearchBar from '../../../components/SearchBar';
import { default as List } from '../../../components/ClientsList';
import ROUTES from '../../../routes';
import Pagination from '../../../components/Pagination';
import useGetClients from '../../../hooks/useGetClients';

const ClientsList = () => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [term, setTerm] = useState('');
  const { clients, total } = useGetClients(perPage, page, term);

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);
  const handleSearch = e => setTerm(e.currentTarget.value);

  const addClientLink = (
    <Link className="btn btn-light btn-lg btn-icon-lg" to={ROUTES.addClient}>
      <Icon name={Icon.types.addUser} className="text-primary" />
      Adicionar Cliente
    </Link>
  );

  return (
    <Container>
      <SearchBar
        title="Clientes"
        right={addClientLink}
        value={term}
        onChange={handleSearch}
      />
      <List clients={clients} />
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
};

export default ClientsList;
