import React from 'react';
import { Modal } from 'react-bootstrap';

import { ReactComponent as EmailSent } from '../../assets/illustrations/email-sent.svg';

const JobSentModal = ({ show, newlyCreatedID, onHide }) => {
  const jobURL = `https://aprovaai.com.br/#jobs/${newlyCreatedID}`;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="px-5 pt-4" closeButton />
      <Modal.Body className="pb-5 px-5 text-center">
        <div className="py-4">
          <div className="mb-4">
            <EmailSent />
          </div>
          <div className="illustration-modal mb-5">
            <h1 className="illustration-modal-title">Concluido!</h1>
            <p className="illustration-modal-text">
              Seu job já foi enviado para o cliente, te notificaremos caso seja
              aprovado ou o tenha algum ajuste :)
            </p>
          </div>
          <p className="illustration-modal-text">
            <a href={jobURL}>{jobURL}</a>
          </p>
          <p className="illustration-modal-text">
            Compartilhe o link do seu job!
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JobSentModal;
