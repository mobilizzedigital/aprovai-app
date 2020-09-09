const ROUTES = {
  home: '/',
  jobs: '/jobs',
  addJob: '/jobs/new',
  jobPackageRevision: '/jobs/:id/review',
  jobDashboard: '/jobs/:id',
  editJob: '/jobs/:id/edit',
  clients: '/clients',
  clientDashboard: '/clients/:id',
  addClient: '/clients/new',
  editClient: '/clients/:id/edit',
  account: '/account',
  accountTeam: '/account/team',
  accountConfiguration: '/account/configuration',
  accountPassword: '/account/password',
  accountPayment: '/account/payment',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password'
};

export function getJobDashboardRoute(id) {
  return `/jobs/${id}`;
}

export function getEditJobRoute(id) {
  return `/jobs/${id}/edit`;
}

export function getClientDashboardRoute(id) {
  return `/clients/${id}`;
}

export function getEditClientRoute(id) {
  return `/clients/${id}/edit`;
}

export function getAddJobRoute(name, type, client) {
  return `${ROUTES.addJob}?name=${name}&type=${type}&client=${client}`;
}

export default ROUTES;
