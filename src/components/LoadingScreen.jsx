import React from 'react';
import { Spinner } from 'react-bootstrap';

import MinimalHeader from '../components/MinimalHeader';

const LoadingScreen = () => (
  <>
    <MinimalHeader />
    <div className="p-5 m-5 text-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="sr-only">Carregando informações do usuário...</span>
      </Spinner>
    </div>
  </>
);

export default LoadingScreen;
