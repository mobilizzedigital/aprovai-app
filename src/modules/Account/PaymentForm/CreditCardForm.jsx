import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import CreditCardBrand from '../../../components/CreditCardBrand';

const CreditCardForm = ({ errorField }) => (
  <section className="rounded border py-3 px-4 mb-3">
    <header className="d-flex mb-3">
      <Form.Check
        type="radio"
        id="cartao"
        label="Cartão de crédito"
        className="font-weight-medium"
        name="paymentType"
        defaultChecked
      />
      <div className="ml-3">
        <CreditCardBrand brand="Master" />
        <CreditCardBrand brand="Visa" />
        <CreditCardBrand brand="Elo" />
        <CreditCardBrand brand="Diners" />
      </div>
    </header>

    <Form.Group controlId="owner">
      <Form.Label>Titular do cartão</Form.Label>
      <Form.Control
        type="text"
        placeholder="Nome impresso no cartão"
        size="lg"
        name="credit_card_name"
        autoComplete="off"
        data-iugu="full_name"
      />
      {errorField('first_name', 'last_name')}
    </Form.Group>

    <Form.Group controlId="number">
      <Form.Label>Número do cartão</Form.Label>
      <Form.Control
        type="text"
        placeholder="Digite somente números"
        size="lg"
        name="credit_card_number"
        autoComplete="off"
        data-iugu="number"
      />
      {errorField('number')}
    </Form.Group>

    <Row>
      <Col xs={12} md={6}>
        <Form.Group controlId="number">
          <Form.Label>Data de expiração</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            name="credit_card_expiration"
            autoComplete="off"
            data-iugu="expiration"
          />
          {errorField('expiration')}
        </Form.Group>
      </Col>
      <Col xs={12} md={6}>
        <Form.Group controlId="number">
          <Form.Label>Código de segurança</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            placeholder="CVV"
            name="credit_card_cvv"
            autoComplete="off"
            data-iugu="verification_value"
          />
          {errorField('verification_value')}
        </Form.Group>
      </Col>
    </Row>
  </section>
);

export default CreditCardForm;
