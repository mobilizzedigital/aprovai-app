import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import store from './store';
import ROUTES from './routes';
import PublicRoute from './modules/PublicRoute';
import PrivateRoute from './modules/PrivateRoute';
import DashboardPage from './pages/Dashboard';
import JobsPage from './pages/Jobs';
import JobDashboardPage from './pages/JobDashboard';
import ClientsPage from './pages/Clients';
import ClientDashboardPage from './pages/ClientDashboard';
import JobFormPage from './pages/JobForm';
import JobPackageReviewPage from './pages/JobPackageReview';
import ClientFormPage from './pages/ClientForm';
import AccountWrapper from './modules/Account/AccountWrapper';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPasswordPage from './pages/ForgotPassword';

import PaymentForm from './pages/account/Payment';

const privateRoutes = [
  { path: ROUTES.addJob, Component: JobFormPage, exact: true },
  { path: ROUTES.editJob, Component: JobFormPage },
  { path: ROUTES.jobPackageRevision, Component: JobPackageReviewPage },
  { path: ROUTES.jobDashboard, Component: JobDashboardPage },
  { path: ROUTES.jobs, Component: JobsPage },
  { path: ROUTES.addClient, Component: ClientFormPage },
  { path: ROUTES.editClient, Component: ClientFormPage },
  { path: ROUTES.clientDashboard, Component: ClientDashboardPage },
  { path: ROUTES.clients, Component: ClientsPage },
  {
    path: ROUTES.accountPayment,
    Component: PaymentForm,
    allowNonSubscribers: true,
    exact: true,
  },
  {
    path: ROUTES.account,
    Component: AccountWrapper,
    allowNonSubscribers: true,
  },
  { path: ROUTES.home, Component: DashboardPage, exact: true },
];

const publicRoutes = [
  { path: ROUTES.login, Component: LoginPage },
  { path: ROUTES.register, Component: RegisterPage },
  { path: ROUTES.forgotPassword, Component: ForgotPasswordPage },
];

const App = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <ToastProvider autoDismissTimeout={5000} autoDismiss>
          <Switch>
            {privateRoutes.map(({ Component, path, ...rest }) => (
              <PrivateRoute path={path} {...rest}>
                <Component />
              </PrivateRoute>
            ))}

            {publicRoutes.map(({ Component, path, ...rest }) => (
              <PublicRoute path={path} {...rest}>
                <Component />
              </PublicRoute>
            ))}
          </Switch>
        </ToastProvider>
      </Provider>
    </HashRouter>
  );
};

export default App;
