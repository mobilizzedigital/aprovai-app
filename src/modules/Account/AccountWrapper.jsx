import React from 'react';
import { NavLink as Link, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import ROUTES from '../../routes';
import MyAccountPage from '../../pages/account/MyAccount';
import TeamPage from '../../pages/account/Team';
import ConfigurationsPage from '../../pages/account/Configurations';
import PasswordPage from '../../pages/account/Password';
import Breadcrumb from '../../components/Breadcrumb';
import usePageTitle from '../../hooks/usePageTitle';
import AdminWrapper from '../../modules/AdminWrapper';

const AccountWrapper = () => {
  usePageTitle('Minha conta');

  return (
    <>
      <Breadcrumb items={[{ title: 'Minha conta', url: ROUTES.addJob }]} />
      <Container>
        <div className="bg-light p-5 rounded shadow">
          <div className="p-lg-5 mx-lg-5">
            <Row>
              <Col md={4} lg={3}>
                <ul className="account-menu">
                  <li className="account-menu-item mb-4">
                    <Link
                      to={ROUTES.account}
                      activeClassName="text-primary"
                      exact
                    >
                      Minha Conta
                    </Link>
                  </li>
                  <AdminWrapper>
                    <li className="account-menu-item mb-4">
                      <Link
                        to={ROUTES.accountTeam}
                        activeClassName="text-primary"
                      >
                        Meu Time
                      </Link>
                    </li>
                  </AdminWrapper>
                  <li className="account-menu-item mb-4">
                    <Link
                      to={ROUTES.accountConfiguration}
                      activeClassName="text-primary"
                    >
                      Configurações
                    </Link>
                  </li>
                  <li className="account-menu-item mb-4">
                    <Link
                      to={ROUTES.accountPassword}
                      activeClassName="text-primary"
                    >
                      Senha
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col md={{ offset: 1 }} lg={{ offset: 2 }}>
                <Switch>
                  <Route path={ROUTES.accountPassword}>
                    <PasswordPage />
                  </Route>
                  <Route path={ROUTES.accountConfiguration}>
                    <ConfigurationsPage />
                  </Route>
                  <Route path={ROUTES.accountTeam}>
                    <TeamPage />
                  </Route>
                  <Route path={ROUTES.account}>
                    <MyAccountPage />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AccountWrapper;
