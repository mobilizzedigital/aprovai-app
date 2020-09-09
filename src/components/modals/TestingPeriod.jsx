import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { ReactComponent as TimeIllustration } from '../../assets/illustrations/time.svg';

const TestingPeriodModal = ({ days = 0, show, onHide, onConfirm }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header className="px-5 pt-4" closeButton />
    <Modal.Body className="px-5 text-center">
      <div className="pt-4">
        <div className="mb-5">
          <TimeIllustration className="w-100" />
        </div>
        <div className="illustration-modal mb-md-5">
          <h1 className="illustration-modal-title text-danger">
            Faltam {days} dias para seu período de teste acabar.
          </h1>
          <p>
            Que tal fazer a contratação do plano agora e ganhar um desconto
            maroto?
          </p>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer className="justify-content-between">
      <Button variant="light" size="lg" onClick={onHide}>
        Agora não
      </Button>
      <Button variant="success" size="lg" onClick={onConfirm}>
        Garantir desconto
      </Button>
    </Modal.Footer>
  </Modal>
);

export default TestingPeriodModal;
