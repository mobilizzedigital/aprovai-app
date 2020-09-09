import React from 'react';
import { Modal } from 'react-bootstrap';

import { ReactComponent as PaymentIllustration } from '../../assets/illustrations/payment.svg';

const PaymentSuccessModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header className="px-5 pt-4" closeButton></Modal.Header>
    <Modal.Body className="pb-5 px-5 text-center">
      <div className="py-4">
        <div className="mb-5">
          <PaymentIllustration />
        </div>
        <div className="illustration-modal mb-5">
          <h1 className="illustration-modal-title">
            Falta pouco, seu pagamento está sendo preocessado, em breve será
            liberado.
          </h1>
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

export default PaymentSuccessModal;
