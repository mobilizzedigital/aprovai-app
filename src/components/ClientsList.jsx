import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Icon from './Icon';
import EmptyState from './EmptyState';
import { getClientDashboardRoute, getEditClientRoute } from '../routes';

const ClientsList = ({ clients, emptyText }) => {
  if (!clients.length) {
    return <EmptyState text="Nenhum cliente cadastrado!" />;
  }

  return (
    <ul>
      {clients.map((client) => (
        <li className="bg-white rounded shadow p-3 mb-2" key={client.id}>
          <Row className="clients-list">
            <Col md={11}>
              <Link
                to={getClientDashboardRoute(client.id)}
                className="clients-list-link"
              >
                <Row>
                  <Col md={3} className="item d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <Avatar src={client.enderecoLogo} size={63} />
                      <div className="ml-3">
                        <p className="m-0">
                          <b className="item-client">{client.nome}</b>
                        </p>
                        <span className="item-owner">{client.aprovador}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="item d-flex align-items-center">
                    <div className="numbers d-flex d-flex align-items-center">
                      <b className="numbers-value mr-2">{client.qtdAjustes}</b>
                      <span className="numbers-text">
                        Solicitações De Ajustes
                      </span>
                    </div>
                  </Col>
                  <Col md={3} className="item d-flex align-items-center">
                    <div className="numbers d-flex d-flex align-items-center">
                      <b className="numbers-value mr-2">
                        {client.qtdAprovacoesPendentes}
                      </b>{' '}
                      <span className="numbers-text">Aprovações Pendentes</span>
                    </div>
                  </Col>
                  <Col md={3} className="item d-flex align-items-center">
                    <div className="numbers d-flex d-flex align-items-center">
                      <b className="numbers-value mr-2">
                        {client.qtdAprovacoes}
                      </b>{' '}
                      <span className="numbers-text">Jobs Aprovados</span>
                    </div>
                  </Col>
                </Row>
              </Link>
            </Col>
            <Col
              md={1}
              className="d-flex align-items-center justify-content-center item-last-col"
            >
              <Button
                as={Link}
                variant="link"
                to={getEditClientRoute(client.id)}
              >
                <Icon
                  name={Icon.types.pencil}
                  screenReaderMessage="Editar cliente"
                />
              </Button>
            </Col>
          </Row>
        </li>
      ))}
    </ul>
  );
};

export default ClientsList;
