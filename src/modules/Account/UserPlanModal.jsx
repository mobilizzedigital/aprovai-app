import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PlanAPI } from '../../api';
import ROUTES from '../../routes';
import UserPlanSelectModal from '../../components/modals/UserPlanSelectModal';
import {
  togglePlansModal,
  showPlansModalSelector,
  plansSelector,
  addPlans,
  addTargetPlan,
  userPlanSelector,
  hasExceedMaxClientsSelector
} from '../../store';

const UserPlan = () => {
  const showPlansModal = useSelector(showPlansModalSelector);
  const userPlan = useSelector(userPlanSelector);
  const plans = useSelector(plansSelector);
  const hasExceedMaxClients = useSelector(hasExceedMaxClientsSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleTogglePlansModal = () => dispatch(togglePlansModal());

  const handleSelectPlan = planId => {
    const plan = plans.filter(plan => plan.id === planId)[0];
    handleTogglePlansModal();
    dispatch(addTargetPlan(plan));
    history.push(ROUTES.accountPayment);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { planos }
        } = await PlanAPI.getPlanOptions();

        dispatch(addPlans(planos));
      } catch (e) {}
    };

    fetchData();
  }, [dispatch]);

  return (
    <UserPlanSelectModal
      currentPlan={userPlan}
      plans={plans}
      show={showPlansModal}
      onHide={handleTogglePlansModal}
      onSelectPlan={handleSelectPlan}
      hasExceedMaxClients={hasExceedMaxClients}
    />
  );
};

export default UserPlan;
