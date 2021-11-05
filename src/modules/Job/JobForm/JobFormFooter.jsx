import React from 'react';
import { Button } from 'react-bootstrap';

import BottomBar from '../../../components/BottomBar';
import IndexMenu from '../../../components/IndexMenu';
import LoadingSpinnerButton from '../../../components/LoadingSpinnerButton';

const JobFormFooter = ({
  index,
  files,
  saving,
  isPackage,
  handleViewItem,
  handleAddItem,
  handleCancel,
  showPreview,
}) => (
  <BottomBar className="d-flex flex-column flex-md-row align-items-center">
    <div />
    <div className="d-flex">
      <Button
        variant="light"
        size="lg"
        className="px-md-5"
        onClick={handleCancel}
      >
        {showPreview ? 'Voltar' : 'Cancelar'}
      </Button>
      <LoadingSpinnerButton
        variant="success"
        loading={saving}
        className="ml-2 ml-md-5 px-md-5"
      >
        {!showPreview ? 'Conluir e revisar' : 'Enviar para o cliente'}
      </LoadingSpinnerButton>
    </div>
  </BottomBar>
);

export default JobFormFooter;
