import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UploadField from '../../../components/UploadField';

const JobDashboardEditModalComponent = ({
  show,
  onHide,
  handleSubmit,
  handleAttachNew,
  handleRemoveFile,
  item,
}) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Form onSubmit={handleSubmit}>
      <Modal.Header className="px-4 px-md-5 pt-4" closeButton>
        <Modal.Title>Adicionar os arquivos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 px-md-5 pt-4">
        <div className="row">
          <div className="col">
            <UploadField
              dataUrls={item.arquivos.map(
                (arquivo) => arquivo.endereco ?? arquivo.dataUrl
              )}
              handleUpload={(readFiles) => handleAttachNew(readFiles)}
              handleRemoveFile={handleRemoveFile}
              multiple
            />
          </div>
          <div className="col">
            <UploadField
              dataUrls={''}
              handleUpload={(readFiles) => handleAttachNew(readFiles)}
              handleRemoveFile={handleRemoveFile}
              multiple
            />
          </div>
        </div>
        <div className="mt-3">
          <Form.Group controlId="name">
            <Form.Label>Nome do item</Form.Label>
            <Form.Control
              type="text"
              size="lg"
              name="name"
              //ref={register({ required: true })}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              size="lg"
              rows={3}
              name="description"
              //ref={register({ required: false })}
            />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer className="px-4 px-md-5 pb-4 d-flex justify-content-between">
        <Button
          variant="light"
          onClick={() => console.log('exclude')}
          size="lg"
        >
          Excluir Item
        </Button>
        <Button variant="primary" size="lg" type="submit">
          Salvar
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

export default JobDashboardEditModalComponent;
