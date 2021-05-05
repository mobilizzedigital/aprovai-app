import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import BottomBar from '../../../components/BottomBar';
import IndexMenu from '../../../components/IndexMenu';
import ROUTES, { getEditJobRoute } from '../../../routes';

const JobDashboardFooter = ({
  isPackage,
  job,
  setIndex,
  user,
  index,
  setRequestChanges,
  requestChanges,
  approveJob,
  saving,
  progressItems,
}) => {
  let isApproved = job.situacao === 'Aprovado';
  let disableChanges =
    job.situacao !== 'Pendente de Aprovação' && job.situacao !== 'Pendente';
  let approveBtnText = 'Aprovar';

  if (isPackage) {
    const file = job.urlArquivo[index];
    isApproved = file.situacao === 'Aprovado';

    /**
     * Check the status of the last item of the timeline of the active file
     */
    if (progressItems.length > 0) {
      disableChanges =
        isApproved ||
        progressItems[progressItems.length - 1].situacao === 'Ajuste';
    }

    if (index < job.urlArquivo.length - 1) {
      approveBtnText = 'Aprovar e ir ao próximo';
    }
  }

  const adminButtons = (
    <>
      <Button
        variant="light"
        size="lg"
        className="px-md-5"
        as={Link}
        to={ROUTES.home}
      >
        Voltar ao inicio
      </Button>
      <Button
        as={Link}
        variant="success"
        size="lg"
        className="ml-5 px-md-5"
        to={getEditJobRoute(job.id)}
      >
        Editar item
      </Button>
    </>
  );

  const nonAdminButtons = (
    <>
      <Button
        variant="light"
        size="lg"
        className="px-md-5"
        onClick={() => setRequestChanges(true)}
        disabled={disableChanges}
      >
        Pedir ajuste
      </Button>

      {isApproved ? (
        <Button variant="success" size="lg" className="ml-5 px-md-5" disabled>
          Aprovado
        </Button>
      ) : (
        <Button
          variant="success"
          type="button"
          size="lg"
          className="px-md-5"
          onClick={approveJob}
          disabled={requestChanges || saving || disableChanges}
        >
          {approveBtnText}
        </Button>
      )}
    </>
  );

  return (
    <BottomBar
      isHidden={requestChanges}
      className="d-flex flex-column flex-md-row align-items-center"
    >
      {isPackage ? (
        <IndexMenu className="mb-3 mb-md-0">
          {job.urlArquivo.map((_, i) => (
            <IndexMenu.Item
              index={i + 1}
              active={i === index}
              key={`file_index_${i}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </IndexMenu>
      ) : (
        <div />
      )}

      <div className="d-flex justify-content-around w-100 w-md-auto d-md-block">
        {user.isAdmin ? adminButtons : nonAdminButtons}
      </div>
    </BottomBar>
  );
};

export default JobDashboardFooter;
