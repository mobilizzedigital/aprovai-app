import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const JobDashboardRemoveItemModal = ({
  handleConfirmRemoveItem,
  showRemoveItemModal,
  handleCloseRemoveItemModal,
}) => {
  return (
    <Modal
      show={showRemoveItemModal}
      onHide={handleCloseRemoveItemModal}
      centered
    >
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <h5 className="w-100 text-center">
          Tem certeza de que deseja excluir este item?
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseRemoveItemModal}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirmRemoveItem}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobDashboardRemoveItemModal;
