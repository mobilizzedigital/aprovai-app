import React from 'react';

import useGetClients from '../../hooks/useGetClients';

const UserClients = () => {
  const { clients } = useGetClients();

  return (
    <div className="mb-4">
      <div className="p-4 bg-grey-light-200 rounded">
        <h6>Clientes</h6>

        {clients.length === 0 && <p>Nenhum cliente</p>}
        {clients.length >= 1 && (
          <ul className="mb-0">
            {clients.map(({ id, nome }) => (
              <li className="text-default text-grey mt-2" key={`client_${id}`}>
                {nome}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserClients;
