import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { UserAPI } from '../../api';
import LoadingSpinnerButton from '../../components/LoadingSpinnerButton';

const AddTeamMember = ({ show, onHide, onMemberAdded }) => {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { addToast } = useToasts();

  const onSubmit = async ({ name, email }) => {
    setSaving(true);
    try {
      /**
       * Request only works if an ID is sent even tough the sent ID is not saved in the database
       *  ¯\_(ツ)_/¯
       * */
      const { data } = await UserAPI.addMember({
        id: 'ignore-me-at-all',
        nome: name,
        email
      });
      addToast(data.message, { appearance: 'success' });
      onMemberAdded();
    } catch (error) {
      if (
        Array.isArray(error.response.data) &&
        error.response.data[0].code === 'DuplicateUserName'
      ) {
        addToast('Email já cadastrado!', { appearance: 'error' });
      } else {
        addToast(error.message, { appearance: 'error' });
      }
    }
    setSaving(false);
  };

  return (
    <Modal show={show} onHide={() => {}} centered>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="pt-5 px-5">
          <div className="mb-5 text-center">
            <Modal.Title>Adicionar membro</Modal.Title>
            <span>Convide alguém para fazer parte do seu time</span>
          </div>

          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              placeholder="Nome do membro"
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
              type="mail"
              size="lg"
              placeholder="Email para enviar o convite"
              name="email"
              ref={register({
                required: {
                  value: true,
                  message: 'Email obrigatório!'
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Email inválido'
                }
              })}
            />
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="px-5 pb-5 d-flex justify-content-between">
          <Button variant="light" onClick={onHide} size="lg">
            Cancelar
          </Button>
          <LoadingSpinnerButton loading={saving}>Salvar</LoadingSpinnerButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTeamMember;
