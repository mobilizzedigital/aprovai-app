import { createAction } from '@reduxjs/toolkit';

export const addUser = createAction('ADD_USER');
export const updateUser = createAction('UPDATE_USER');
export const addTopClients = createAction('ADD_TOP_CLIENTS');
export const togglePlansModal = createAction('TOGGLE_PLANS_MODAL');
export const addPlans = createAction('ADD_PLANS');
export const addUserPlan = createAction('ADD_USER_PLAN');
export const addTargetPlan = createAction('ADD_TARGET_PLAN');
