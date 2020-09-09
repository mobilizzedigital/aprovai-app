import React from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';

import PaymentSuccessModal from '../../../components/modals/PaymentSuccessModal';
import LoadingSpinnerButton from '../../../components/LoadingSpinnerButton';
import CreditCardForm from './CreditCardForm';
import PaymentInfo from './PaymentInfo';
import PaymentHistory from './PaymentHistory';
import { formatMoney } from '../../../utils';
import { PAYMENT_STATES } from './constants';

const PaymentForm = ({
  handleSubmit,
  handleChangePlan,
  errorField,
  paying,
  showModal,
  plan,
  user,
  paymentHistory,
  paymentState,
  handleChangePayment
}) => {
  const showSubmitButton =
    paymentState === PAYMENT_STATES.pay ||
    paymentState === PAYMENT_STATES.update;

  const showPlanDetails =
    paymentState !== PAYMENT_STATES.load &&
    paymentState !== PAYMENT_STATES.noPlanSelected;

  return (
    <>
      <Form id="payment-form" onSubmit={handleSubmit}>
        <Row className="bg-light shadow rounded p-4 mb-5">
          {showPlanDetails && (
            <>
              <Col xs={12} lg={6}>
                <div className="px-4 pt-4">
                  <h2 className="h3 mb-3">Forma de pagamento</h2>
                  {paymentState === PAYMENT_STATES.view ? (
                    <PaymentInfo
                      user={user}
                      handleChangePayment={handleChangePayment}
                    />
                  ) : (
                    <CreditCardForm errorField={errorField} />
                  )}
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <section className="px-4 pt-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3 className="h6 mb-0">Plano {plan.titulo}</h3>
                    <Button
                      variant="link"
                      className="mr-4 text-default text-primary"
                      onClick={handleChangePlan}
                    >
                      Trocar
                    </Button>
                  </div>
                  {(plan.descricao || '').split('\\n').map((line, index) => (
                    <div className="text-default" key={`desc_option_${index}`}>
                      {line}
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between text-default mb-5">
                    <b>Total</b>
                    <b>{formatMoney(plan.valor)}/Mês</b>
                  </div>

                  <PaymentHistory history={paymentHistory} />

                  {showSubmitButton && (
                    <div className="d-flex justify-content-end">
                      <LoadingSpinnerButton variant="success" loading={paying}>
                        {paymentState === PAYMENT_STATES.pay && 'Confirmar '}
                        {paymentState === PAYMENT_STATES.update && 'Atualizar '}
                        pagamento
                      </LoadingSpinnerButton>
                    </div>
                  )}
                </section>
              </Col>
            </>
          )}

          {paymentState === PAYMENT_STATES.load && (
            <div className="p-4 w-100 text-center">
              <Spinner
                as="span"
                animation="border"
                size="lg"
                role="status"
                className="text-black-50"
                aria-hidden="true"
              />
            </div>
          )}

          {paymentState === PAYMENT_STATES.noPlanSelected && (
            <div className="p-4 w-100 text-center">
              <p>Nenhum plano selecionado!</p>
              <Button
                variant="link"
                className="mr-4 text-default text-primary"
                onClick={handleChangePlan}
              >
                Selecionar Plano
              </Button>
            </div>
          )}
        </Row>
      </Form>

      <PaymentSuccessModal
        show={showModal}
        onHide={() => window.location.reload()}
      />
    </>
  );
};

export default PaymentForm;
