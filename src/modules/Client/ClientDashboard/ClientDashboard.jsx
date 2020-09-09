import React from 'react';
import { Container, Row, Col, Button, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ClientJobsList from '../../../components/ClientJobsList';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/Icon';
import { getEditClientRoute } from '../../../routes';
import { ReactComponent as ClientDashboardIllustration } from '../../../assets/illustrations/client-dashboard.svg';

const ClientDashboard = ({ jobs, isAdmin, client, user, id }) => {
  const pendingJobs = (
    <ClientJobsList
      value={jobs.Pendente ? jobs.Pendente.length : 0}
      label="Aprovações Pendentes"
      status="Pendente"
      emptyText="Voce não tem aprovações pendentes"
      jobs={jobs.Pendente || []}
      isAdmin={isAdmin}
    />
  );

  const adjustingJobs = (
    <ClientJobsList
      value={jobs.Ajuste ? jobs.Ajuste.length : 0}
      label="Solicitações De Ajustes"
      status="Em Ajuste"
      emptyText="Voce não tem ajustes solicitados"
      jobs={jobs.Ajuste || []}
      isAdmin={isAdmin}
    />
  );

  const approvedJobs = (
    <ClientJobsList
      value={jobs.Aprovado ? jobs.Aprovado.length : 0}
      label="Jobs Aprovados"
      status="Aprovado"
      emptyText="Voce não tem jobs aprovados"
      jobs={jobs.Aprovado || []}
      isAdmin={isAdmin}
    />
  );

  return (
    <div className="mt-md-5">
      <Container>
        <Row>
          <Col lg={4}>
            {!isAdmin && (
              <div className="banner rounded mb-4 p-4 text-light d-flex flex-row-reverse flex-md-column">
                <div>
                  <p className="banner-title font-weight-medium">
                    Olá, {user.name}
                  </p>
                  {(jobs.Pendente && jobs.Pendente.length && (
                    <p className="banner-subtitle">
                      Você Tem Algumas Demandas Para Aprovar!
                    </p>
                  )) || (
                    <p className="banner-subtitle">
                      Bom trabalho, <br />
                      Você não possui nenhum job pendente de aprovação!
                    </p>
                  )}
                </div>
                <div className="pr-4 p-md-4">
                  <ClientDashboardIllustration style={{ width: '100%' }} />
                </div>
              </div>
            )}
            {isAdmin && (
              <div className="client-details">
                <Avatar src={client.enderecoLogo} size={208} className="mb-4" />
                <h2 className="client-details-name">
                  {client ? client.nome : ''}
                </h2>
                <hr />
                <span className="client-details-text">Aprovadores</span>
                <ul className="client-details-approvers mt-2">
                  {client.aprovadores.map(({ id, aprovador }) => (
                    <li key={id}>{aprovador}</li>
                  ))}
                </ul>
                <Button
                  variant="link"
                  className="p-0 text-dark"
                  as={Link}
                  to={getEditClientRoute(id)}
                >
                  <Icon name={Icon.types.pencil} />
                  Editar
                </Button>
              </div>
            )}
          </Col>

          <Col lg={8} className="mt-4 mt-lg-0">
            {/* Mobile view */}
            <div className="d-lg-none">
              <Tab.Container defaultActiveKey="pending" id="jobs">
                <Nav className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="pending" className="p-0 mr-1">
                      <span className="tabs-btn btn">Pendentes</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="adjusting" className="p-0 mr-1">
                      <span className="tabs-btn btn">Em Ajuste</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="approvals" className="p-0 mr-1">
                      <span className="tabs-btn btn">Aprovados</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="pending">{pendingJobs}</Tab.Pane>
                  <Tab.Pane eventKey="adjusting">{adjustingJobs}</Tab.Pane>
                  <Tab.Pane eventKey="approvals">{approvedJobs}</Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>

            {/* Desktop view */}
            <Row className="d-none d-lg-flex">
              <Col lg={4} className="px-2">
                {pendingJobs}
              </Col>
              <Col lg={4} className="px-2">
                {adjustingJobs}
              </Col>
              <Col lg={4} className="px-2">
                {approvedJobs}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClientDashboard;
