import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Stats from './Stats';
import { getJobDashboardRoute } from '../routes';

const ClientJobsList = ({ label, value, status, emptyText, jobs, isAdmin }) => (
  <>
    <Stats status={status} label={label} value={value} bordered />

    <div className="client-jobs-list shadow mb-4 bg-light px-3 rounded">
      {!jobs.length && (
        <p className="client-jobs-list-empty text-center pt-4">{emptyText}</p>
      )}

      {jobs.map((job) => (
        <div className="client-jobs-list-item p-2" key={`job_${job.id}`}>
          <Link
            to={getJobDashboardRoute(job.id, job.tipoProjeto, isAdmin)}
            className="d-flex align-items-center"
          >
            <Avatar src={job.urlArquivo} size={31} />
            <b className="ml-3 client-jobs-list-name">{job.titulo}</b>
          </Link>
        </div>
      ))}
    </div>
  </>
);

export default ClientJobsList;
