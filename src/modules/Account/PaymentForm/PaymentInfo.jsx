import React from 'react';
import { Button } from 'react-bootstrap';

import CreditCardBrand from '../../../components/CreditCardBrand';

const PaymentInfo = ({ user, handleChangePayment }) => {
  const paymentCard = user.paymentInfo[user.paymentInfo.length - 1].cardDetails;

  return (
    <div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center">
      <span className="mr-2 text-default">
        <CreditCardBrand brand={paymentCard.brand} />
      </span>
      <span className="mr-2 text-default">{paymentCard.displayNumber}</span>
      <Button
        variant="light"
        type="button"
        className="text-primary text-default"
        onClick={handleChangePayment}
      >
        Trocar
      </Button>
    </div>
  );
};

export default PaymentInfo;
