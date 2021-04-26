import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import CreateJobModalComponent from './CreateJobModal';
import ROUTES, { getAddJobRoute } from '../../../routes';
import { ClientsAPI } from '../../../api';

const mapClientToSelect = ({ id, nome, enderecoLogo }) => ({
  value: id,
  label: nome,
  logo: enderecoLogo,
});

const CreateJobModal = ({ show, onHide }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [showErrorClient, setShowErrorClient] = useState(false);
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const { register, handleSubmit, errors, reset, setValue } = useForm();

  const handleAddClient = () => {
    onHide();
    history.push(ROUTES.addClient);
  };

  const handleSelectClient = (client) => setClient(client);

  const onSubmit = ({ name, type }) => {
    if (client) {
      setClient(null);
      setShowErrorClient(false);
      onHide();
      reset();
      history.push(getAddJobRoute(name, type, client.value));
    } else {
      setShowErrorClient(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ClientsAPI.getClients(100);

        setClients(data.empresas);
        setLoading(false);
        if (location.pathname.includes('/clients/')) {
          const foundClient = data.empresas.filter(
            (client) => client.id === parseInt(params.id, 10)
          )[0];

          setClient(mapClientToSelect(foundClient));
        }
      } catch (error) {
        setLoading(false);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show, params, location, setValue]);

  const clientsData = clients.map(mapClientToSelect);

  return (
    <CreateJobModalComponent
      handleSubmit={handleSubmit(onSubmit)}
      show={show}
      onHide={onHide}
      loading={loading}
      clientsData={clientsData}
      handleAddClient={handleAddClient}
      handleSelectClient={handleSelectClient}
      register={register}
      errors={errors}
      client={client}
      showErrorClient={showErrorClient}
    />
  );
};

export default CreateJobModal;
