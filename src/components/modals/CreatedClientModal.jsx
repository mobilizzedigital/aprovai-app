import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { ReactComponent as CreatedClientIllustration } from '../../assets/illustrations/created-client.svg';

const CreatedClientModal = ({ show, onHide, onClickNo, onClickYes }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header className="px-5 pt-4" closeButton></Modal.Header>
    <Modal.Body className="pb-5 px-5 text-center">
      <div className="py-4">
        <div className="mb-5">
          <CreatedClientIllustration className="w-100" />
        </div>
        <div className="illustration-modal mb-5">
          <h1 className="illustration-modal-title">Parabéns!</h1>
          <p className="illustration-modal-text">
            Você acabou de cadastrar seu primeiro cliente, o que acha de
            adicionar seu primeiro job?
          </p>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer className="justify-content-between">
      <Button variant="light" size="lg" onClick={onClickNo}>
        Agora não
      </Button>
      <Button variant="primary" size="lg" onClick={onClickYes}>
        Sim, adicionar job
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CreatedClientModal;
