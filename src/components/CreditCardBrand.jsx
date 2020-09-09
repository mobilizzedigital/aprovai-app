import React from 'react';

import { ReactComponent as Master } from '../assets/illustrations/credit-card-brands/mastercard.svg';
import { ReactComponent as Visa } from '../assets/illustrations/credit-card-brands/visa.svg';
import { ReactComponent as Elo } from '../assets/illustrations/credit-card-brands/elo.svg';
import { ReactComponent as Diners } from '../assets/illustrations/credit-card-brands/diners.svg';

const brandsMap = {
  Diners: () => <Diners />,
  Elo: () => <Elo />,
  Mastercard: () => <Master />,
  MasterCard: () => <Master />,
  Master: () => <Master />,
  Visa: () => <Visa />
};

const CreditCardBrand = ({ brand }) => <span>{brandsMap[brand]()}</span>;

export default CreditCardBrand;
