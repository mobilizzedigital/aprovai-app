import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { UserAPI } from '../../api';
import LoadingSpinnerButton from '../../components/LoadingSpinnerButton';

const UserPassword = () => {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const { addToast } = useToasts();

  const onSubmit = async ({ oldPassword, newPassword }) => {
    setSaving(true);
    try {
      await UserAPI.updatePassword({
        currentPassword: oldPassword,
        password: newPassword,
        passwordConfirmation: newPassword
      });
      addToast('Senha atualizada com sucesso!', { appearance: 'success' });
      reset();
    } catch (error) {
      addToast(error.response.data.message, { appearance: 'error' });
    }
    setSaving(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="oldPassword">
        <Form.Label>Senha antiga</Form.Label>
        <Form.Control
          type="password"
          size="lg"
          name="oldPassword"
          ref={register({ required: true })}
        />
        {errors.oldPassword && (
          <Form.Text className="text-danger">
            Senha antiga obrigatória!
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="newPassword">
        <Form.Label>Nova senha</Form.Label>
        <Form.Control
          type="password"
          size="lg"
          name="newPassword"
          ref={register({ required: true })}
        />

        {errors.newPassword && (
          <Form.Text className="text-danger">Nova senha obrigatória!</Form.Text>
        )}
      </Form.Group>
      <LoadingSpinnerButton loading={saving}>
        Salvar alterações
      </LoadingSpinnerButton>
    </Form>
  );
};

export default UserPassword;
