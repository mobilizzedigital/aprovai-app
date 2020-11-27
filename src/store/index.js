import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducer';

export {
  addUser,
  updateUser,
  addTopClients,
  toggleCreateJobModal,
  togglePlansModal,
  addTargetPlan,
  addUserPlan,
  addPlans
} from './actions';

export {
  userSelector,
  topClientsSelector,
  showCreateJobModalSelector,
  showPlansModalSelector,
  userPlanSelector,
  plansSelector,
  targetPlanSelector,
  hasExceedMaxClientsSelector
} from './selectors';

const store = configureStore({
  reducer
});

export default store;
