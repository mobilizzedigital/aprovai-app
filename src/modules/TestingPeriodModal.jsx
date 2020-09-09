import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import differenceInDays from 'date-fns/differenceInDays';

import { userSelector, togglePlansModal } from '../store';
import Modal from '../components/modals/TestingPeriod';

const TOTAL_TRIAL_DAYS = 7;

const TestingPeriodModal = () => {
  const [show, setShow] = useState(true);
  const [days, setDays] = useState(3);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleHide = () => setShow(false);
  const handleConfirm = () => {
    setShow(false);
    dispatch(togglePlansModal());
  };

  useEffect(() => {
    if (user.isAdmin) {
      const daysSinceRegister = differenceInDays(
        new Date(),
        new Date(user.dataCadastro)
      );
      setDays(TOTAL_TRIAL_DAYS - daysSinceRegister);
    }
  }, [user]);

  if (!user.isAdmin) return null;

  return (
    <Modal
      days={days}
      show={show}
      onHide={handleHide}
      onConfirm={handleConfirm}
    />
  );
};

export default TestingPeriodModal;
