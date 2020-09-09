import { createReducer } from '@reduxjs/toolkit';

import * as actions from './actions';

const initialState = {
  user: {},
  topClients: [],
  showCreateJobModal: false,
  showPlansModal: false,
  plans: {
    current: {},
    target: {},
    options: []
  }
};

export const reducer = createReducer(initialState, {
  [actions.addUser]: (state, action) => ({ ...state, user: action.payload }),

  [actions.updateUser]: (state, action) => ({
    ...state,
    user: { ...state.user, ...action.payload }
  }),

  [actions.addTopClients]: (state, action) => ({
    ...state,
    topClients: action.payload
  }),

  [actions.toggleCreateJobModal]: state => ({
    ...state,
    showCreateJobModal: !state.showCreateJobModal
  }),

  [actions.togglePlansModal]: state => ({
    ...state,
    showPlansModal: !state.showPlansModal
  }),

  [actions.addUserPlan]: (state, action) => ({
    ...state,
    plans: {
      ...state.plans,
      current: action.payload
    }
  }),

  [actions.addTargetPlan]: (state, action) => ({
    ...state,
    plans: {
      ...state.plans,
      target: action.payload
    }
  }),

  [actions.addPlans]: (state, action) => ({
    ...state,
    plans: {
      ...state.plans,
      options: action.payload
    }
  })
});

export default reducer;
