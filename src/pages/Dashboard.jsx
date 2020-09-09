import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import usePageTitle from '../hooks/usePageTitle';
import Page from '../components/Page';
import Section from '../components/Section';
import DashboardStats from '../modules/Dashboard/DashboardStats';
import DashboardClients from '../modules/Dashboard/DashboardClients';
import DashboardLastUpdates from '../modules/Dashboard/DashboardLastUpdates';
import ClientDashboard from '../modules/Client/ClientDashboard';
import { userSelector } from '../store';

const DashboardPage = () => {
  const user = useSelector(userSelector);

  usePageTitle('Dashboard');

  if (!user.isAdmin) {
    return (
      <Page>
        <Container>
          <ClientDashboard isAdmin={false} id={user.companyId} />
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <Row>
          <Col md={6} lg={6}>
            <Section title="Dashboard">
              <DashboardStats />
            </Section>
          </Col>
          <Col md={6} lg={{ span: 5, offset: 1 }}>
            <Section title="Acesso rápido Clientes">
              <DashboardClients />
            </Section>
            <Section title="Últimos Ajustes" height={380}>
              <DashboardLastUpdates />
            </Section>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default DashboardPage;
