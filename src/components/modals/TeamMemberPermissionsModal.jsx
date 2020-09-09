import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TeamMemberPermissionsModal = ({ show, clients }) => (
  <Modal show={show} onHide={() => {}} centered>
    <Modal.Body className="pt-5 px-5">
      <div className="mb-5 text-center">
        <Modal.Title>Acesso aos clientes</Modal.Title>
        <div>
          Selecione a quais clientes <span className="text-primary">Tatá</span>{' '}
          tem acesso
        </div>
      </div>

      <Form>
        <div className="py-2 px-3 bg-grey-light-200 rounded">
          <Form.Check label="MARCAR TODOS" type="checkbox" id="check_1" />
        </div>
        {clients.map(client => (
          <div className="px-3 py-4 border-bottom" key={client.id}>
            <Form.Check
              label={client.name}
              type="checkbox"
              id={`client_${client.id}`}
              className="font-weight-medium form-check-spaced"
            />
          </div>
        ))}
      </Form>
    </Modal.Body>
    <Modal.Footer className="px-5 pb-5 d-flex justify-content-between">
      <Button variant="light" onClick={() => {}} size="lg">
        Cancelar
      </Button>
      <Button variant="primary" onClick={() => {}} size="lg">
        Salvar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default TeamMemberPermissionsModal;
