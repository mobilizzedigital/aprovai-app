import React from 'react';
import { Modal, Button, ButtonGroup, Row, Col } from 'react-bootstrap';

import { cn, formatMoney } from '../../utils';

const UserPlanSelectModal = ({
  show,
  onHide,
  onSelectPlan,
  plans,
  currentPlan
}) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header className="px-5 pt-4" closeButton></Modal.Header>
    <Modal.Body className="text-center pt-0 pb-5 px-5">
      <div className="plan">
        <h1 className="plan-title font-weight-bold">Planos de preços</h1>
        <p className="plan-subtitle">
          Escolha seu plano alternando entre os diferentes preços
        </p>

        <ButtonGroup aria-label="Tipo de plano" className="mt-4" toggle>
          <Button
            variant={'highlight'}
            size="sm"
            className={cn(['px-4', 'rounded'])}
          >
            Mensal
          </Button>
        </ButtonGroup>

        <Row className="my-5 justify-content-center">
          {plans.map(plan => {
            const isUserPlan = plan.titulo === currentPlan.titulo;

            return (
              <Col
                xs={12}
                sm={6}
                lg={3}
                key={`plan_${plan.id}`}
                className="mb-4 mb-lg-0"
              >
                <div
                  className={cn([
                    'plan-option',
                    'border',
                    'p-3',
                    'h-100',
                    'rounded',
                    isUserPlan ? 'plan-option-selected' : ''
                  ])}
                >
                  <h3 className="plan-option-type text-uppercase'">
                    {plan.titulo}
                  </h3>
                  <h4 className="plan-option-price font-weight-bold">
                    {formatMoney(plan.valor)}
                  </h4>
                  <p className="plan-option-text text-grey mb-4 font-weight-medium">
                    /Por mês
                  </p>
                  {plan.descricao.split('\\n').map((line, index) => (
                    <p
                      className="plan-option-text mb-0 font-weight-medium"
                      key={`option_${index}`}
                    >
                      {line}
                    </p>
                  ))}
                  <Button
                    variant={isUserPlan ? 'secondary' : 'success'}
                    disabled={isUserPlan}
                    onClick={() => onSelectPlan(plan.id)}
                    className="mt-5"
                    size="lg"
                    block
                  >
                    {isUserPlan ? 'Plano atual' : 'Escolher plano'}
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Modal.Body>
  </Modal>
);

export default UserPlanSelectModal;
