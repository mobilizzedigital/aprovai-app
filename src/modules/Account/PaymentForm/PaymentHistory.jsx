import React from 'react';
import format from 'date-fns/format';
import ptBr from 'date-fns/locale/pt-BR';

const PaymentHistory = ({ history }) => (
  <>
    <h3 className="h6 mb-2">Últimas transações</h3>
    <div
      className="rounded bg-grey-light-100 p-3 text-default text-black-50 mb-3"
      style={{ minHeight: 200 }}
    >
      {history.length === 0 && <p className="mb-0">Não há transações</p>}
      {history.map(({ id, dataContratacao }) => (
        <div
          className="d-flex justify-content-between align-items-center border-bottom py-2"
          key={`history_${id}`}
        >
          <p className="mb-0">Mensal</p>
          <p className="mb-0">
            {format(new Date(dataContratacao), 'dd/MM/yyyy', { locale: ptBr })}
          </p>
          <p className="mb-0">Aprovado</p>
        </div>
      ))}
    </div>
  </>
);

export default PaymentHistory;
