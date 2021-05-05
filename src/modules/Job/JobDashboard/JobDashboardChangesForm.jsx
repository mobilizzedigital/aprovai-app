import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { scrollToElement } from '../../../utils';

const JobDashboardChangesForm = ({
  handleRequestChanges,
  setRequestChanges,
  saving,
}) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ description }) => handleRequestChanges(description);
  const onCancel = () => setRequestChanges(false);

  useEffect(() => {
    scrollToElement(
      document.querySelector('#request-changes-buttons'),
      400,
      'linear'
    );
  }, []);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-light p-4 rounded shadow mb-3"
    >
      <Form.Control
        as="textarea"
        rows="5"
        size="lg"
        placeholder="Digite o que deseja alterar"
        name="description"
        ref={register({ required: true })}
      />
      {errors.description && (
        <Form.Text className="text-danger">
          Necessário adicionar o que deseja alterar!
        </Form.Text>
      )}
      <div
        className="d-flex justify-content-between mt-3"
        id="request-changes-buttons"
      >
        <Button
          variant="light"
          size="lg"
          className="w-50 mr-2"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="w-50 ml-2"
          type="submit"
          disabled={saving}
        >
          Pedir ajuste
        </Button>
      </div>
    </Form>
  );
};

export default JobDashboardChangesForm;
