import React from 'react';
import { Modal } from 'react-bootstrap';

import { ReactComponent as EmailSent } from '../../assets/illustrations/email-sent.svg';

const JobChangesRequestedModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="px-5 pt-4" closeButton />
      <Modal.Body className="pb-5 px-5 text-center">
        <div className="py-4">
          <div className="mb-4">
            <EmailSent className="w-100" />
          </div>
          <div className="illustration-modal mb-5">
            <h1 className="illustration-modal-title">
              Seu pedido de ajuste foi enviado, te notificaremos quando for
              alterado.
            </h1>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JobChangesRequestedModal;
