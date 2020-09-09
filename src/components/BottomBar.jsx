import React, { useRef, useLayoutEffect } from 'react';
import { Container } from 'react-bootstrap';

const BottomBar = ({ isHidden = false, children, className = '' }) => {
  const bottomBarRef = useRef(null);

  useLayoutEffect(() => {
    document.body.style.paddingBottom = `${bottomBarRef.current.offsetHeight +
      30}px`;
  });

  return (
    <div
      className={`bottom-bar mt-5 shadow py-2 px-md-2 bg-light sticky-bottom w-100 ${
        isHidden ? 'is-hidden' : ''
      }`}
      ref={bottomBarRef}
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
