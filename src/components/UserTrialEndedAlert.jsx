import React from 'react';
import { Alert, Button } from 'react-bootstrap';

import Icon from './Icon';

const UserTrialEndedAlert = ({ onSeePlans }) => (
  <Alert variant="danger" className="mb-0 rounded-0 text-center">
    <Icon name={Icon.types.warning} className="mr-3" />
    Seu período de avaliação terminou, contrate um plano para continuar usando o
    Aprova aí.
    <Alert.Link
      as={Button}
      variant="light"
      className="text-danger ml-3"
      onClick={onSeePlans}
    >
      Ver planos
    </Alert.Link>
  </Alert>
);

export default UserTrialEndedAlert;
