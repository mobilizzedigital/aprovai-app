import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { cn } from '../utils';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import Avatar from './Avatar';
import Icon from './Icon';
import { getJobDashboardRoute } from '../routes';
import { JOB_TYPES } from '../constants';

const JobsListTable = ({ jobs, loading }) => {
  if (loading) {
    return <LoadingState />;
  }

  if (!jobs.length) {
    return <EmptyState text="Nenhum job cadastrado!" />;
  }

  return (
    <div className="w-100 overflow-auto">
      <table className="jobs-list-table bg-white rounded shadow w-100 mb-3">
        <thead>
          <tr>
            <th className="px-3 pt-3 pb-2 text-uppercase font-weight-normal">
              Cliente
            </th>
            <th className="px-3 pt-3 pb-2 text-uppercase font-weight-normal">
              Tipo
            </th>
            <th className="px-3 pt-3 pb-2 text-uppercase font-weight-normal">
              Última Atualização
            </th>
            <th className="px-3 pt-3 pb-2 text-uppercase font-weight-normal">
              Status
            </th>
            <th className="px-3 pt-3 pb-2 text-uppercase font-weight-normal">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={`job_${job.id}`}>
              <td className="px-3 py-2">
                <Link
                  to={getJobDashboardRoute(job.id, job.tipoProjeto)}
                  className="d-flex align-items-center"
                >
                  <Avatar src={job.enderecoLogo} className="mr-3" />
                  {job.titulo}
                </Link>
              </td>
              <td className="px-3 py-2">
                {job.tipoProjeto}{' '}
                {job.tipoProjeto === JOB_TYPES.package
                  ? `(${job.qtdImagem})`
                  : ''}
              </td>
              <td className="px-3 py-2">
                {format(
                  new Date(job.dataAtualizacao),
                  "dd 'de' MMMM 'às' hh:mm",
                  { locale: ptBr }
                )}
              </td>
              <td className="px-3 py-2">
                <span
                  className={cn([
                    'py-2',
                    'rounded',
                    'd-inline-block',
                    'text-center',
                    'status',
                    `status-${
                      job.situacao
                        ? job.situacao.toLowerCase().replace(' ', '-')
                        : ''
                    }`
                  ])}
                >
                  {job.situacao}
                </span>
              </td>
              <td className="px-3 py-2">
                <Link
                  className="border-0 p-3 rounded link"
                  to={getJobDashboardRoute(job.id, job.tipoProjeto)}
                >
                  <Icon name={Icon.types.link} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsListTable;
