import React from 'react';

import CopyLink from '../../../components/CopyLink';
import { cn } from '../../../utils';

const JobDashboardHeader = ({ isPackage, job, index }) => {
  let status = job.situacao ? job.situacao : 'Pendente';
  if (isPackage) {
    status =
      job.urlArquivo[index].situacao === 'Pendente de Aprovação'
        ? 'Pendente'
        : job.urlArquivo[index].situacao;
  }
  const statusClass = status.toLowerCase().replace(' ', '-');

  return (
    <header className="mt-3 mt-md-0">
      <h1 className="job-details-title h4 d-flex flex-column flex-md-row">
        {job.titulo}{' '}
        {isPackage && (
          <span className="text-black-50 ml-md-3 mt-2">
            Pacote ({job.urlArquivo.length} itens)
          </span>
        )}
      </h1>
      <span>{job.descricao}</span>
      <div className="d-flex my-3 align-items-center">
        <span className="d-inline-block mr-3">Status</span>
        <span
          className={cn([
            'py-2',
            'rounded',
            'd-inline-block',
            'text-center',
            'status',
            `status-${statusClass}`,
            'mr-3',
          ])}
        >
          {status}
        </span>
        <CopyLink />
      </div>
    </header>
  );
};

export default JobDashboardHeader;
