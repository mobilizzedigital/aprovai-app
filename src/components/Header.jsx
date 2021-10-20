import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NavDropdown, Navbar, Container, Button } from 'react-bootstrap';

import UserAvatar from './UserAvatar';
import Notifications from '../modules/Notifications';
import AdminWrapper from '../modules/AdminWrapper';
import ROUTES from '../routes';
import Icon from './Icon';

const Header = ({ onClickCreateJob, onLogout, user }) => {
  const [toggleIcon, setToggleIcon] = useState(Icon.types.menu);
  const allowUserActions = user.situation !== 'USER_TRIAL_ENDED';

  const handleToggle = (isOpened) =>
    setToggleIcon(isOpened ? Icon.types.close : Icon.types.menu);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="header"
      onToggle={handleToggle}
    >
      <Container>
        <Link className="navbar-brand mr-4" to={ROUTES.home}>
          <img
            src={`${process.env.PUBLIC_URL}/images/aprovaai-logo.png`}
            className="logo"
            alt="Aprova ai"
          />
        </Link>

        <Navbar.Toggle
          aria-controls="navbar"
          className="p-0 border-0 d-flex d-lg-none align-items-center"
        >
          <Icon name={toggleIcon} className="toggle-menu-icon" />
          <UserAvatar
            src={user.profilePicture}
            size={40}
            className="bg-grey-light-100 ml-3"
            circle
          />
        </Navbar.Toggle>

        <Navbar.Collapse
          id="navbar"
          className="justify-content-between pb-4 pb-lg-0"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to={ROUTES.home}
                className="nav-link"
                activeClassName="active"
                exact
              >
                Dashboard
              </NavLink>
            </li>
            <AdminWrapper>
              <li className="nav-item">
                <NavLink
                  to={ROUTES.jobs}
                  className="nav-link"
                  activeClassName="active"
                >
                  Jobs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={ROUTES.clients}
                  className="nav-link"
                  activeClassName="active"
                >
                  Clientes
                </NavLink>
              </li>
            </AdminWrapper>
            <li className="nav-item">
              <NavLink
                to={ROUTES.account}
                className="nav-link"
                activeClassName="active"
              >
                Minha conta
              </NavLink>
            </li>
            <li className="nav-item d-lg-none mb-3">
              <Button
                variant="link"
                className="nav-link p-0"
                onClick={onLogout}
              >
                Sair
              </Button>
            </li>
          </ul>

          <AdminWrapper>
            <Button
              className="btn-highlight mt-2 mt-md-0"
              onClick={onClickCreateJob}
            >
              <span className="icon icon-plus"></span>
              Adicionar Job
            </Button>
          </AdminWrapper>

          <ul className="navbar-nav flex-row mt-3 mt-lg-0 d-none d-lg-flex">
            <li className="nav-item d-flex ml-3 align-items-center">
              <Notifications
                isDisabled={user.situation === 'USER_TRIAL_ENDED'}
              />
            </li>
            <li className="nav-item d-flex ml-3 align-items-center">
              <UserAvatar
                src={user.profilePicture}
                size={40}
                className="mr-3 mr-md-2 bg-grey-light-100"
                circle
              />

              <NavDropdown title={user.name || ''}>
                <NavDropdown.Item as="div">
                  <NavLink to={ROUTES.account}>Minha conta</NavLink>
                </NavDropdown.Item>
                <AdminWrapper>
                  <NavDropdown.Item as="div">
                    <NavLink to={ROUTES.accountTeam}>Meu time</NavLink>
                  </NavDropdown.Item>
                </AdminWrapper>
                <NavDropdown.Item as="div">
                  <Button variant="link" className="p-0" onClick={onLogout}>
                    Sair
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
