import React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from '../../routes';
import Avatar from '../../components/Avatar';
import Icon from '../../components/Icon';
import useGetClients from '../../hooks/useGetClients';

const DashboardClients = () => {
  const { clients } = useGetClients(5);

  return (
    <div className="d-flex flex-wrap client-avatar-row">
      {clients.map(({ id, enderecoLogo }) => (
        <div key={`dash_client_${id}`} className="mb-md-4 client-avatar px-2">
          <Link to={`/clients/${id}`}>
            <Avatar
              src={enderecoLogo}
              size="100%"
              className="shadow bg-light"
            />
          </Link>
        </div>
      ))}
      <div className="mb-md-4 client-avatar px-2">
        <Link to={ROUTES.addClient}>
          <span
            className="bg-light shadow h-100 flex-center rounded text-primary"
            style={{ minHeight: 71 }}
          >
            <Icon
              name={Icon.types.plus}
              screenReaderMessage="Cadastrar cliente"
            />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardClients;
