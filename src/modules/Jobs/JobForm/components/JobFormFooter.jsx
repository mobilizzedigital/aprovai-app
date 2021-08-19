import React from 'react';
import { Button } from 'react-bootstrap';

// import IndexMenu from '../../../../components/IndexMenu';
import BottomBar from '../../../../components/BottomBar';
import LoadingSpinnerButton from '../../../../components/LoadingSpinnerButton';
import { useJobViewContext } from '../context';

const JobFormFooter = () => {
  const [{ isPreviewPage }] = useJobViewContext();

  const onCancel = () => {
    if (isPreviewPage) {
      // @TODO: return to form
    } else {
      // @TODO: return to job list or previous page
    }
  };

  return (
    <BottomBar className="d-flex flex-column flex-md-row align-items-center">
      <div></div>
      <div className="d-flex">
        <Button
          variant="light"
          size="lg"
          className="px-md-5"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <LoadingSpinnerButton
          variant="success"
          loading={false}
          className="ml-2 ml-md-5 px-md-5"
          type="submit"
        >
          {isPreviewPage ? 'Enviar para o cliente' : 'Conluir e revisar'}
        </LoadingSpinnerButton>
      </div>
    </BottomBar>
  );
};

export default JobFormFooter;
