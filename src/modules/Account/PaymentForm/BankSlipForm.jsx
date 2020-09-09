import React from 'react';
import { Form } from 'react-bootstrap';

const BankSlipForm = () => (
  <section className="rounded border py-3 px-4 bg-grey-light-100">
    <header className="d-flex mb-3">
      <Form.Check
        type="radio"
        id="boleto"
        label="Boleto bancário"
        name="paymentType"
        className="font-weight-medium"
      />
    </header>
    <p className="text-default mb-0 text-black-50" style={{ marginLeft: 30 }}>
      O Boleto bancário será exibido após a confirmação.
    </p>
  </section>
);

export default BankSlipForm;
