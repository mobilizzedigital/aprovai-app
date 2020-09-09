import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const UserAccountWrapper = ({ head, children }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="user-account-page">
      <Container>
        <Row>
          <Col lg={7} className="d-none d-lg-flex">
            <div className="user-account-page-head-wrapper d-flex align-items-center pr-5">
              <p className="user-account-page-head text-light font-weight-light">
                O jeito mais simples
                <br /> <strong>de receber feedback</strong>
                <br /> dos seus jobs criativos ;)
              </p>
            </div>
          </Col>
          <Col lg={5} className="px-0 px-lg-2">
            <div className="user-account-page-form bg-light shadow py-4 px-5 w-100">
              {children}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserAccountWrapper;
