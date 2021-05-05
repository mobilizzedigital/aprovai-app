import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { UserAPI } from '../../api';
import { userSelector } from '../../store';
import ROUTES from '../../routes';

const DeleteAccountModal = ({ email, show, handleHide }) => {
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector(userSelector);
  const { addToast } = useToasts();

  const handleSave = async () => {
    try {
      await UserAPI.deleteUser(user.email);
      addToast('Usuário removido com sucesso!', {
        appearance: 'success',
      });
      handleHide();
      // Removing his account
      if (user.email === email) {
        localStorage.removeItem('aprovai_user_token');
        setShowLogin(true);
      }
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
    }
  };

  if (showLogin) {
    return <Redirect to={ROUTES.login} />;
  }

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Body className="px-5 pt-5">
        <p className="text-center">
          Tem certeza que deseja remover a conta associada ao email{' '}
          <em>{email}</em>?
        </p>
      </Modal.Body>
      <Modal.Footer className="px-5 pb-5 d-flex justify-content-between">
        <Button variant="light" onClick={handleHide} size="lg">
          Cancelar
        </Button>
        <Button variant="danger" size="lg" type="button" onClick={handleSave}>
          Remover conta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountModal;
