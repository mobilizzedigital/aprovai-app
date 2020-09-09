import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import LoadingSpinnerButton from '../../components/LoadingSpinnerButton';
import { UserAPI } from '../../api';
import ROUTES from '../../routes';

const LoginForm = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const { addToast } = useToasts();
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = async form => {
    try {
      setAuthenticating(true);

      const { data } = await UserAPI.login({
        userName: form.userName,
        password: form.password,
        secret: process.env.REACT_APP_API_SECRET
      });
      const { token } = data;

      localStorage.setItem('aprovaai_user_token', token);
      addToast('Login realizado com sucesso!', { appearance: 'success' });
      reset();
      setAuthenticating(false);
      setLoggedIn(true);
    } catch (error) {
      setAuthenticating(false);
      addToast('Username ou Password não encontrado!', { appearance: 'error' });
    }
  };

  if (loggedIn) return <Redirect to={ROUTES.home} />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <span>Clique aqui pra </span>
        <Link className="btn btn-link text-primary p-0" to={ROUTES.register}>
          criar conta
        </Link>
        <span className="mx-1">ou</span>
        <Link
          className="btn btn-link text-primary p-0"
          to={ROUTES.forgotPassword}
        >
          recuperar senha
        </Link>
      </div>
      <hr />
      <h5 className="text-center">Fazer login</h5>
      <p className="mb-5 text-center">
        Informe seus dados de acesso para logar
      </p>
      <Form.Group controlId="userName">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          size="lg"
          name="userName"
          ref={register({ required: true })}
        />
        {errors.userName && (
          <Form.Text className="text-danger">Usuário obrigatório!</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          size="lg"
          name="password"
          ref={register({ required: true })}
        />
        {errors.userName && (
          <Form.Text className="text-danger">Senha obrigatória!</Form.Text>
        )}
      </Form.Group>
      <div className="d-flex justify-content-end mt-5">
        <LoadingSpinnerButton
          variant="success"
          loading={authenticating}
          className="px-5"
        >
          Fazer login
        </LoadingSpinnerButton>
      </div>
    </Form>
  );
};

export default LoginForm;
