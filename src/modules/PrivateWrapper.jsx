import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';

import { toggleCreateJobModal, showCreateJobModalSelector } from '../store';
import { UserAPI } from '../api';
import { validateUserSubscription } from '../utils';
import ROUTES from '../routes';
import PageHeader from './PageHeader';
import CreateJobModal from './Job/CreateJobModal';
import UserPlanModal from '../modules/Account/UserPlanModal';
import TestingPeriodModal from './TestingPeriodModal';
import UserTrialEndedAlert from '../components/UserTrialEndedAlert';
import LoadingScreen from '../components/LoadingScreen';
import {
  addTopClients,
  addUser,
  addUserPlan,
  togglePlansModal,
  showPlansModalSelector,
} from '../store';

const PrivateWrapper = ({ render, allowNonSubscribers }) => {
  const [tokenExpired, setTokenExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [situation, setSituation] = useState(null);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const showCreateJobModal = useSelector(showCreateJobModalSelector);
  const showPlansModal = useSelector(showPlansModalSelector);

  const handleToggleCreateJobModal = () => dispatch(toggleCreateJobModal());
  const handleTogglePlansModal = () => dispatch(togglePlansModal());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await UserAPI.getUser();
        const {
          assinaturaIugu,
          user,
          clientes,
          plano,
          perfil,
          empresa,
          dadosCartaoIugu,
        } = data;

        const situation = validateUserSubscription(
          perfil === 'Proprietario',
          !!assinaturaIugu,
          user.dataCadastro
        );

        setSituation(situation);
        dispatch(
          addUser({
            ...user,
            perfil,
            situation,
            companyId: empresa.id,
            isAdmin: perfil === 'Proprietario',
            payment: assinaturaIugu,
            paymentInfo: dadosCartaoIugu,
            companyLogo: empresa.enderecoLogo,
          })
        );
        dispatch(addUserPlan(plano));
        dispatch(addTopClients(clientes.slice(0, 5)));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setTokenExpired(true);
        addToast('Sessão expirado! Entre novamente!', { appearance: 'info' });
        localStorage.removeItem('aprovaai_user_token');
      }
    };

    if (!localStorage.getItem('aprovaai_user_token')) {
      setTokenExpired(true);
    } else {
      fetchData();
    }
  }, [dispatch, addToast]);

  if (tokenExpired) {
    return <Redirect to={ROUTES.login} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const showTrialEndedAlert = situation === 'USER_TRIAL_ENDED';
  const showTrialModal = situation === 'USER_TRIAL_PERIOD';
  const showLockOverlay =
    !showPlansModal && !allowNonSubscribers && situation === 'USER_TRIAL_ENDED';

  return (
    <>
      {showTrialEndedAlert && (
        <UserTrialEndedAlert onSeePlans={handleTogglePlansModal} />
      )}
      <PageHeader onClickCreateJobModal={handleToggleCreateJobModal} />
      {showLockOverlay && <div className="lock-overlay" />}
      {render}
      {showTrialModal && <TestingPeriodModal />}
      <CreateJobModal
        show={showCreateJobModal}
        onHide={handleToggleCreateJobModal}
      />
      <UserPlanModal />
    </>
  );
};

export default PrivateWrapper;
