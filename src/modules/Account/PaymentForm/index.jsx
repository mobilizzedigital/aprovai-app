import React, { useEffect, useState, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import PaymentFormComponent from './PaymentForm';
import { PlanAPI } from '../../../api';
import { ERROR_MESSAGES, PAYMENT_STATES } from './constants';
import {
  togglePlansModal,
  targetPlanSelector,
  userSelector,
  userPlanSelector,
  showPlansModalSelector,
} from '../../../store';

let userPaymentIugu = false;

const errorField = (errors) => (...fields) =>
  fields.map((field, index) => {
    if (errors[field])
      return (
        <Form.Text className="text-danger" key={index}>
          {ERROR_MESSAGES[field]}
        </Form.Text>
      );
    return null;
  });

const PaymentForm = ({ setPageTitle }) => {
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentState, setPaymentState] = useState(PAYMENT_STATES.load);

  const dispatch = useDispatch();
  const targetPlan = useSelector(targetPlanSelector);
  const userPlan = useSelector(userPlanSelector);
  const showPlansModal = useSelector(showPlansModalSelector);
  const user = useSelector(userSelector);
  const { addToast } = useToasts();
  userPaymentIugu = user.payment;

  const getCurrentPlan = () => {
    // Returns the plan the user is buying
    if (Object.keys(targetPlan).length > 0) {
      return targetPlan;
    }

    // Returns user plan
    if (userPlan) {
      // userPlan does not have all necessary information,
      // so get these data from the plans list
      return plans.filter(({ titulo }) => titulo === userPlan.titulo)[0];
    }

    return {};
  };

  const savePayment = async (token) => {
    try {
      await PlanAPI.savePlan(token, user.companyId, targetPlan.id, 1);
      // Show success modal
      setShowModal(true);
    } catch (e) {
      addToast(e.response.data.message, { appearance: 'error' });
    }
    setPaying(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPaying(true);

    window.Iugu.createPaymentToken(e.target, (response) => {
      if (response.errors) {
        setErrors(response.errors);
        setPaying(false);
      } else {
        savePayment(response.id);
      }
    });
  };

  const handleChangePayment = () => setPaymentState(PAYMENT_STATES.update);

  const handleChangePlan = useCallback(() => dispatch(togglePlansModal()), [
    dispatch,
  ]);

  useEffect(() => {
    // Check when the plans modal closes if user has choosen another plan
    if (!showPlansModal && targetPlan && targetPlan.id) {
      setPaymentState(PAYMENT_STATES.update);
    }
  }, [showPlansModal, targetPlan]);

  useEffect(() => {
    const setupIugu = () => {
      window.Iugu.setAccountID(process.env.REACT_APP_IUGU_ACCOUNT_ID);
    };

    const fetchPaymentHistory = async () => {
      try {
        const {
          data: { planos },
        } = await PlanAPI.getUserPlan();
        setPaymentHistory(planos);
      } catch (e) {}
    };

    const fetchPlans = async () => {
      try {
        const {
          data: { planos },
        } = await PlanAPI.getPlanOptions();

        setPlans(planos);

        if (userPaymentIugu) {
          if (targetPlan && targetPlan.id) {
            setPaymentState(PAYMENT_STATES.update);
          } else {
            setPaymentState(PAYMENT_STATES.view);
          }
        } else {
          if (targetPlan && targetPlan.id) {
            setPaymentState(PAYMENT_STATES.pay);
          } else {
            addToast('Selecione um plano!', { appearance: 'info' });
            setPaymentState(PAYMENT_STATES.noPlanSelected);
            handleChangePlan();
          }
        }
      } catch (e) {
        setPaymentState(PAYMENT_STATES.error);
      }
    };

    setupIugu();
    fetchPaymentHistory();
    fetchPlans();

    if (userPaymentIugu) {
      setPageTitle('Plano atual');
    }
  }, [setPageTitle, targetPlan, handleChangePlan, addToast]);

  useEffect(() => window.Iugu.setup());

  return (
    <PaymentFormComponent
      handleSubmit={handleSubmit}
      handleChangePlan={handleChangePlan}
      errorField={errorField(errors)}
      paying={paying}
      paymentHistory={paymentHistory}
      showModal={showModal}
      plan={getCurrentPlan()}
      user={user}
      paymentState={paymentState}
      handleChangePayment={handleChangePayment}
    />
  );
};

export default PaymentForm;
