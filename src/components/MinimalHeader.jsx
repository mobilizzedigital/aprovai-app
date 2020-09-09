import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

import ROUTES from '../routes';

const MinimalHeader = ({ onClickCreateJobModal, userName }) => (
  <Navbar bg="dark" variant="dark" expand="lg" className="header">
    <Container>
      <Link className="navbar-brand mr-4" to={ROUTES.home}>
        <img
          src={`${process.env.PUBLIC_URL}/images/aprovaai-logo.png`}
          className="logo"
          alt="Aprova ai"
        />
      </Link>
    </Container>
  </Navbar>
);

export default MinimalHeader;
