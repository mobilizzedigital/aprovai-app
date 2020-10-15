import React from 'react';
import { Container } from 'react-bootstrap';

const BottomBar = ({ isHidden = false, children, className = '' }) => {
  return (
    <div
      className={`bottom-bar mt-5 shadow py-2 px-md-2 bg-light sticky-bottom w-100 ${
        isHidden ? 'is-hidden' : ''
      }`}
    >
      <Container>
        <div className={`d-flex justify-content-between ${className}`}>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default BottomBar;
