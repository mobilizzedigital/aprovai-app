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
}) => (
  <BottomBar className="d-flex flex-column flex-md-row align-items-center">
    {isPackage ? (
      <IndexMenu className="mb-3 mb-md-0">
        {files.map((_, i) => (
          <IndexMenu.Item
            key={`file_index_${i}`}
            onClick={() => handleViewItem(i)}
            index={i + 1}
            active={i === index}
          />
        ))}
        <IndexMenu.AddItem onClick={handleAddItem} />
      </IndexMenu>
    ) : (
      <div />
    )}

    <div className="d-flex">
      <Button
        variant="light"
        size="lg"
        className="px-md-5"
        onClick={handleCancel}
      >
        Cancelar
      </Button>
      <LoadingSpinnerButton
        variant="success"
        loading={saving}
        className="ml-2 ml-md-5 px-md-5"
      >
        {isPackage ? 'Conluir e revisar' : 'Enviar para o cliente'}
      </LoadingSpinnerButton>
    </div>
  </BottomBar>
);

export default JobFormFooter;
