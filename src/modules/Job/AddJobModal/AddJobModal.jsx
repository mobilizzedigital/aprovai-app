import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UploadField from '../../../components/UploadField';

const AddJobModalComponent = ({
  show,
  onHide,
  handleSubmit,
  register,
  handleUpload,
  files,
  dataUrls,
}) => (
  <Modal show={show} onHide={onHide} centered>
    <Form onSubmit={handleSubmit}>
      <Modal.Header className="px-4 px-md-5 pt-4" closeButton>
        <Modal.Title>Adicionar os arquivos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 px-md-5 pt-4">
        <UploadField dataUrls={dataUrls} handleUpload={handleUpload} multiple />
        <div className="mt-3">
          <Form.Group controlId="name">
            <Form.Label>Nome do item</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              name="name"
              ref={register({ required: true })}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              size="lg"
              rows={3}
              name="description"
              ref={register({ required: false })}
            />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer className="px-4 px-md-5 pb-4 d-flex justify-content-between">
        <Button variant="light" onClick={onHide} size="lg">
          Cancelar
        </Button>
        <Button variant="primary" size="lg" type="submit">
          Adicionar Item
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

export default AddJobModalComponent;
