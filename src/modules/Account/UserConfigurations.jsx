import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';

import { UserAPI } from '../../api';
import { updateUser, userSelector } from '../../store';
import DeleteAccountModal from './DeleteAccountModal';

const UserConfigurations = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const handleToggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  useEffect(() => {
    if (user.name) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [setValue, user]);

  const onSubmit = async ({ name, email }) => {
    var formData = new FormData();

    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('UserName', user.userName);

    try {
      await UserAPI.saveUser(formData);
      dispatch(updateUser({ name, email }));
      addToast('Usuário atualizado com sucesso!', { appearance: 'success' });
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>Seu nome</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            name="name"
            ref={register({ required: true })}
          />
          {errors.name && (
            <Form.Text className="text-danger">Nome obrigatório!</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            size="lg"
            name="email"
            ref={register({
              required: {
                value: true,
                message: 'Email obrigatório!',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-5">
          <Button
            variant="link"
            className="px-0"
            onClick={handleToggleDeleteModal}
          >
            Excluir Conta
          </Button>
        </Form.Group>
        <Button variant="success" size="lg" type="submit">
          Salvar alterações
        </Button>
      </Form>
      <DeleteAccountModal
        show={showDeleteModal}
        email={user.email}
        handleHide={handleToggleDeleteModal}
      />
    </>
  );
};

export default UserConfigurations;
