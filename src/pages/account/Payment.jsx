import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import PaymentForm from '../../modules/Account/PaymentForm';
import usePageTitle from '../../hooks/usePageTitle';
import Breadcrumb from '../../components/Breadcrumb';
import ROUTES from '../../routes';

const Payment = () => {
  const [title, setTitle] = useState('Pagamento');

  usePageTitle(title);

  const setPageTitle = title => setTitle(title);

  return (
    <>
      <Breadcrumb
        items={[
          { title: 'Minha conta', url: ROUTES.account },
          { title: title, url: ROUTES.accountPayment }
        ]}
      />
      <Container>
        <PaymentForm setPageTitle={setPageTitle} />
      </Container>
    </>
  );
};

export default Payment;
