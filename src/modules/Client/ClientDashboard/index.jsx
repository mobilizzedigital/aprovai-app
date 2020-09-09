import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux';

import { ClientsAPI, JobsAPI } from '../../../api';
import { userSelector } from '../../../store';
import ClientDashboardComponent from './ClientDashboard';

const emptyClient = {
  nome: '',
  aprovadores: []
};

const ClientDashboard = ({ isAdmin = true, id, setPageTitle }) => {
  const [client, setClient] = useState(emptyClient);
  const [jobs, setJobs] = useState({});
  const { addToast } = useToasts();
  const user = useSelector(userSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { empresa }
        } = await ClientsAPI.getClient(id);

        setClient(empresa);
        if (setPageTitle) {
          setPageTitle(empresa.nome);
        }
      } catch (error) {
        addToast('Cliente não encontrado!', { appearance: 'error' });
      }

      const {
        data: { projetos }
      } = await JobsAPI.getJobsByClient(id);

      const jobsByClient = {
        Aprovado: [],
        Pendente: [],
        Ajuste: []
      };
      projetos.forEach(job => {
        jobsByClient[job.situacao].push(job);
      });
      setJobs(jobsByClient);
    };

    if (id) {
      fetchData();
    }
  }, [id, addToast, setPageTitle]);

  return (
    <ClientDashboardComponent
      isAdmin={isAdmin}
      client={client}
      jobs={jobs}
      user={user}
      id={id}
    />
  );
};

export default ClientDashboard;
