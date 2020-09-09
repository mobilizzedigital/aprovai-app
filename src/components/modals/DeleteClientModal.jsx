import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { ReactComponent as DeleteClientIllustration } from '../../assets/illustrations/delete-client.svg';

const DeleteClientModal = ({ show, onHide, onDelete }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header className="px-5 pt-4" closeButton />
    <Modal.Body className="px-5 text-center">
      <div className="pt-4">
        <div className="mb-5">
          <DeleteClientIllustration />
        </div>
        <div className="illustration-modal mb-5">
          <h1 className="illustration-modal-title">
            Tem certeza que deseja excluir esse cliente?
          </h1>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer className="justify-content-between">
      <Button variant="light" size="lg" onClick={onHide}>
        Cancelar
      </Button>
      <Button variant="primary" size="lg" onClick={onDelete}>
        Sim, excluir
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteClientModal;
