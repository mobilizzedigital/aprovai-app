import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { ReactComponent as DashboardIllustration } from '../../assets/illustrations/dashboard.svg';
import Stats from '../../components/Stats';
import { userSelector } from '../../store';
import { JobsAPI } from '../../api';
import { cn } from '../../utils';
import ROUTES from '../../routes';

const DashboardStats = () => {
  const [approvals, setApprovals] = useState({});
  const [jobs, setJobs] = useState([]);
  const userName = useSelector(userSelector).name;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await JobsAPI.getApprovals();
        const { data: pendingJobs } = await JobsAPI.getPendingJobs(3);

        const totalApprovals = {};
        data.situacoes.forEach(({ qtd, situacao }) => {
          if (!totalApprovals[situacao]) {
            totalApprovals[situacao] = 0;
          }
          totalApprovals[situacao] += qtd;
        });

        setApprovals(totalApprovals);
        setJobs(pendingJobs);
      } catch (error) {}
    };

    fetchData();
  }, []);

  /** @TODO Check this out */
  const totalPending = jobs.filter(job => job.situacao === 'Pendente').length;

  return (
    <>
      <div className="banner rounded mb-4 p-4 w-100 d-flex text-light">
        <DashboardIllustration style={{ width: 100 }} />

        <div className="pl-4 d-flex flex-column justify-content-center">
          <p className="banner-title font-weight-medium">
            Vamos lá, {userName}!
          </p>
          <p className="banner-subtitle">
            {totalPending > 0
              ? `Você Tem ${totalPending} Ajustes Pendentes`
              : 'Você não tem Ajustes Pendentes'}
          </p>
          <ul className="banner-list mt-4">
            {jobs.map(job => (
              <li
                className={cn([
                  'banner-list-item d-flex',
                  job.situacao === 'Aprovado' ? 'banner-list-item-checked' : ''
                ])}
                key={`job_${job.id}`}
              >
                {job.titulo}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Row>
        <Col sm={6} lg={4} className="d-flex">
          <Stats
            status="Pendente"
            label="Aprovações Pendentes"
            value={approvals.Pendente || 0}
            link={ROUTES.jobs}
            column
          />
        </Col>
        <Col sm={6} lg={4} className="d-flex">
          <Stats
            status="Aprovado"
            label="Jobs Aprovados"
            value={approvals.Aprovado || 0}
            link={ROUTES.jobs}
            column
          />
        </Col>
        {/** @TODO Implement it  */}
        <Col sm={6} lg={4} className="d-flex">
          <Stats
            status="Em Ajuste"
            label="Solicitações De Ajustes"
            value={approvals.Ajuste || 0}
            link={ROUTES.jobs}
            column
          />
        </Col>
      </Row>
    </>
  );
};

export default DashboardStats;
