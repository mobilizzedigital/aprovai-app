import React from 'react';
import { Link } from 'react-router-dom';

import StatusIcon from './StatusIcon';
import Icon from './Icon';
import { getJobDashboardRoute } from '../routes';

const JobCard = ({ id, index, image, name, status = '', onRemove }) => (
  <div className="job-card bg-white rounded shadow">
    <figure className="m-0 position-relative">
      <img className="job-card-image w-100" src={image} alt={name} />
      <button
        className="job-card-remove position-absolute border-0 bg-transparent"
        onClick={() => onRemove(index)}
      >
        <Icon name={Icon.types.cancel} screenReaderMessage="Remover job" />
      </button>
    </figure>
    <Link
      to={id ? getJobDashboardRoute(id) : '#'}
      className="d-flex align-items-center justify-content-between p-3"
    >
      <div className="d-flex align-items-center">
        <img
          className="job-card-icon mr-2"
          src="/images/img-cover.png"
          alt=""
        />
        <span className="job-card-name">{name}</span>
      </div>
      <StatusIcon status={status} size={31} className="ml-2" />
    </Link>
  </div>
);

export default JobCard;
