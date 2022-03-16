import React from 'react';

import CopyLink from '../../../components/CopyLink';
import { cn } from '../../../utils';
import Avatar from '../../../components/Avatar';
import { Button } from 'react-bootstrap';
import Icon from '../../../components/Icon';

const JobDashboardHeader = ({ job, index, avatar, item, onRemoveItem }) => {
  let status = !item.arquivos[0].situacao
    ? item.arquivos[0].situacao
    : 'Ajuste';
  const statusClass = status.toLowerCase().replace(' ', '-');

  return (
    <div className="rounded shadow bg-light p-3 pr-4 mb-3">
      <div className="d-flex flex-direction-row">
        <Avatar src={avatar} size={56} />
        <div className="ml-3">
          <h1 className="job-details-title h4 d-flex flex-column flex-md-row">
            {job.titulo}{' '}
          </h1>
          <h3>{item.nome}</h3>
        </div>
      </div>
      <div className="d-flex my-3 align-items-center justify-content-between">
        <div>
          <span className="d-inline-block mr-3">Status</span>
          <span
            className={cn([
              'py-2',
              'rounded',
              'd-inline-block',
              'text-center',
              'status',
              `status-${statusClass}`,
              'mr-2',
            ])}
          >
            {status}
          </span>
        </div>
        <CopyLink />
        <Button variant="light" className="ml-1" onClick={onRemoveItem}>
          Excluir item
          <Icon name={Icon.types.delete} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default JobDashboardHeader;
