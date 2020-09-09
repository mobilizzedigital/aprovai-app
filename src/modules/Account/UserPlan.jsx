import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../../components/Icon';
import { togglePlansModal, userPlanSelector, userSelector } from '../../store';
import ROUTES from '../../routes';

const UserPlan = () => {
  const userPlan = useSelector(userPlanSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleShowPlansModal = () => dispatch(togglePlansModal());

  return (
    <div className="mb-4">
      <div className="p-4 bg-grey-light-200 rounded">
        <h6>Informações do plano atual</h6>
        <p className="text-default mb-0 text-grey">
          Plano Mensal - {userPlan.titulo || 'Periodo de teste'}
        </p>
      </div>

      {user.payment ? (
        <Button
          as={Link}
          variant="link"
          className="px-0 mt-1"
          size="sm"
          to={ROUTES.accountPayment}
        >
          <Icon
            name={Icon.types.pencil}
            screenReaderMessage="Trocar de plano"
          />
          Trocar de plano
        </Button>
      ) : (
        <Button
          variant="link"
          className="px-0 mt-1"
          size="sm"
          onClick={handleShowPlansModal}
        >
          <Icon
            name={Icon.types.pencil}
            screenReaderMessage="Trocar de plano"
          />
          Trocar de plano
        </Button>
      )}
    </div>
  );
};

export default UserPlan;
