import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

import LoadingSpinnerButton from '../../components/LoadingSpinnerButton';
import { UserAPI } from '../../api';
import ROUTES from '../../routes';

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const RegisterForm = () => {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();
  const { addToast } = useToasts();
  const history = useHistory();

  const validatePasswordEquals = (password, confirmation) => {
    if (password !== confirmation) {
      setError('confirmPassword', '', 'Senhas não conferem!');
      return false;
    }
    return true;
  };

  const onSubmit = async ({ name, email, password, confirmPassword }) => {
    if (!validatePasswordEquals(password, confirmPassword)) {
      return null;
    }

    var formData = new FormData();

    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('PasswordConfirmation', confirmPassword);
    formData.append('secret', process.env.REACT_APP_API_SECRET);

    setSaving(true);

    try {
      await UserAPI.saveUser(formData);
      addToast('Usuário criado com sucesso, realize o login!', {
        appearance: 'success'
      });
      history.push(ROUTES.login);
    } catch (error) {
      if (error.response.data.descricao) {
        addToast(error.response.data.descricao, { appearance: 'error' });
      } else {
        addToast('Houve um erro ao cadastrar o cliente!', {
          appearance: 'error'
        });
      }
    }
    setSaving(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <span>Clique aqui pra </span>
        <Button
          variant="link"
          className="text-primary p-0"
          onClick={() => history.push(ROUTES.login)}
        >
          fazer login
        </Button>
      </div>
      <hr />
      <h5 className="text-center">Criar conta</h5>
      <p className="mb-5 text-center">
        Preencha os dados para realizar o seu cadastro
      </p>
      <Form.Group controlId="name">
        <Form.Label>Nome</Form.Label>
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
          type="text"
          size="lg"
          ref={register({
            required: {
              value: true,
              message: 'Email obrigatório!'
            },
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email inválido'
            }
          })}
          name="email"
        />
        {errors.email && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Crie sua senha de acesso</Form.Label>
        <Form.Control
          type="password"
          size="lg"
          name="password"
          ref={register({
            required: {
              value: true,
              message: 'Senha obrigatória!'
            },
            minLength: {
              value: 6,
              message: 'Senha deve ter no mínimo 6 caracteres.'
            }
          })}
        />
        {errors.password && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirmação de senha de acesso</Form.Label>
        <Form.Control
          type="password"
          size="lg"
          name="confirmPassword"
          ref={register({
            required: {
              value: true,
              message: 'Confirmação de Senha obrigatória!'
            },
            minLength: {
              value: 6,
              message: 'Senha deve ter no mínimo 6 caracteres.'
            }
          })}
        />
        {errors.confirmPassword && (
          <Form.Text className="text-danger">
            {errors.confirmPassword.message}
          </Form.Text>
        )}
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="light"
          onClick={() => history.push(ROUTES.login)}
          size="lg"
        >
          Cancelar
        </Button>
        <LoadingSpinnerButton
          variant="success"
          className="px-4"
          loading={saving}
        >
          Criar conta
        </LoadingSpinnerButton>
      </div>
    </Form>
  );
};

export default RegisterForm;
