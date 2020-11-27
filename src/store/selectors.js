export const userSelector = state => state.user;
export const topClientsSelector = state => state.topClients;
export const showCreateJobModalSelector = state => state.showCreateJobModal;
export const showPlansModalSelector = state => state.showPlansModal;
export const plansSelector = state => state.plans.options;
export const userPlanSelector = state => state.plans.current;
export const targetPlanSelector = state => state.plans.target;
export const hasExceedMaxClientsSelector = state => state.hasExceedMaxClients;
