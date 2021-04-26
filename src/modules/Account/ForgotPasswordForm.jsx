import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { UserAPI } from '../../api';
import ROUTES from '../../routes';
import LoadingSpinnerButton from '../../components/LoadingSpinnerButton';

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const ForgotPasswordForm = () => {
  const [saving, setSaving] = useState(false);
  const { addToast } = useToasts();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ email }) => {
    setSaving(true);
    try {
      await UserAPI.forgotPassword(email);
    } catch (e) {}
    addToast('Você recebera um email com a nova senha!', {
      appearance: 'success',
    });
    setSaving(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <span>Clique aqui pra </span>
        <Link className="btn btn-link text-primary p-0" to={ROUTES.login}>
          fazer login
        </Link>
      </div>
      <hr />
      <h5 className="text-center">Recuperar senha</h5>
      <p className="mb-5 text-center">
        Informe seu email de acesso para recupar conta
      </p>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          size="lg"
          ref={register({
            required: {
              value: true,
              message: 'Email obrigatório!',
            },
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email inválido',
            },
          })}
          name="email"
        />
        {errors.email && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
      </Form.Group>
      <div className="d-flex justify-content-end mt-5">
        <LoadingSpinnerButton
          variant="success"
          className="px-5"
          loading={saving}
        >
          Recuperar senha
        </LoadingSpinnerButton>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;
