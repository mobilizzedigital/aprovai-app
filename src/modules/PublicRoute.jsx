import React from 'react';
import { Route } from 'react-router-dom';

import MinimalHeader from '../components/MinimalHeader';

const PublicRoute = ({ children, ...rest }) => (
  <Route {...rest}>
    <MinimalHeader />
    {children}
  </Route>
);

export default PublicRoute;
