import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import ptBr from 'date-fns/locale/pt-BR';

import Card from '../../components/Card';
import { JobsAPI } from '../../api';
import ROUTES, { getJobDashboardRoute } from '../../routes';
import { userSelector } from '../../store';

const DashboardLastUpdates = () => {
  const [jobs, setJobs] = useState([]);
  const user = useSelector(userSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await JobsAPI.getPendingJobs(10);
        setJobs(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <>
      {jobs.length === 0 && (
        <Card link={ROUTES.home}>
          <Card.Body>
            <Card.Text>Você não tem ajustes</Card.Text>
          </Card.Body>
        </Card>
      )}
      {jobs.map((job) => (
        <Card key={`update_${job.id}`} link={getJobDashboardRoute(job.id)}>
          <Card.Image src={job.enderecoLogo} />
          <Card.Body>
            <Card.Title>{job.titulo}</Card.Title>
            <Card.Text>{job.descricao}</Card.Text>
            <Card.Text>
              <small>
                <em>
                  Enviado por <strong>{user.name}</strong> |{' '}
                  {format(
                    new Date(job.dataAtualizacao),
                    "'dia' dd 'de' MMMM 'às' HH:mm",
                    { locale: ptBr }
                  )}
                </em>
              </small>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default DashboardLastUpdates;
