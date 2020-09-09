import React from 'react';
import { Route } from 'react-router-dom';

import PrivateWrapper from './PrivateWrapper';
import TokenAuth from './TokenAuth';

const PrivateRoute = ({ children, allowNonSubscribers = false, ...rest }) => (
  <Route {...rest}>
    <TokenAuth>
      <PrivateWrapper
        render={children}
        allowNonSubscribers={allowNonSubscribers}
      />
    </TokenAuth>
  </Route>
);

export default PrivateRoute;
