import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import UploadField from '../../../../components/UploadField';
import { useJobFormContext, useJobViewContext } from '../context';

const UploadFilesModal = () => {
  const [fields, setFieldsValue] = useState({ name: '', description: '' });
  const [emptyNameError, setEmptyNameError] = useState(false);
  const [emptyFilesError, setEmptyFilesError] = useState(false);
  const [files, setFiles] = useState([]);

  const [{ uploadModal }, dispatchViewContext] = useJobViewContext();
  const [{ items }, dispatchFormContext] = useJobFormContext();

  const closeModal = () => dispatchViewContext({ type: 'close_upload_modal' });

  const handleChange = (e) => {
    e.persist();

    setFieldsValue((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = (newFiles) => {
    setFiles([...newFiles.map(([dataUrl, file]) => ({ dataUrl, file }))]);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!fields.name.length && !files.length) {
      setEmptyNameError(true);
      setEmptyFilesError(true);
      return;
    }
    if (!fields.name.length) {
      return setEmptyNameError(true);
    }
    if (!files.length) {
      return setEmptyFilesError(true);
    }
    dispatchFormContext({
      type: 'set_items',
      value: {
        name: fields.name,
        description: fields.description,
        files,
      },
    });
    setFiles([]);
    setFieldsValue({ name: '', description: '' });
    setEmptyNameError(false);
    setEmptyFilesError(false);
    closeModal();
  };

  const hasFiles = files.length > 0;

  useEffect(() => {
    if (!uploadModal.isOpen) {
      setFiles([]);
      setFieldsValue({ name: '', description: '' });
    }
  }, [uploadModal.isOpen]);

  useEffect(() => {
    const { isOpen, mode, index } = uploadModal;
    if (isOpen && mode === 'edit') {
      const { name, description, files } = items[index];
      setFiles(files);
      setFieldsValue({ name, description });
    }
  }, [items, uploadModal]);

  return (
    <Modal show={uploadModal.isOpen} onHide={closeModal} centered>
      <Modal.Header className="px-5 pt-4" closeButton>
        <Modal.Title>Adicionar os arquivos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-0 px-5">
        <div className={`${hasFiles ? 'd-flex' : ''}`}>
          {hasFiles && (
            <div
              className="w-50 mb-2"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
              }}
            >
              {files.slice(0, 4).map((file) => (
                <div className="rounded overflow-hidden mr-2 mb-2">
                  <img className="w-100 h-100" src={file.dataUrl} />
                </div>
              ))}
            </div>
          )}

          <div className={`mb-3 ${hasFiles ? 'w-50 ml-1' : ''}`}>
            <UploadField
              file={null}
              infoText="Faça o upload de um ou mais arquivos"
              handleUpload={handleUpload}
              multiple
            />
            {emptyFilesError && (
              <Form.Text className="text-danger">
                Selecione um arquivo!
              </Form.Text>
            )}
          </div>
        </div>
        <Form.Group controlId="name">
          <Form.Label>Nome do item</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            name="name"
            value={fields.name}
            onChange={handleChange}
          />
          {emptyNameError && (
            <Form.Text className="text-danger">
              Nome do item é obrigatório!
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>
            Descrição <span className="text-secondary">(opcional)</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            size="lg"
            name="description"
            value={fields.description}
            onChange={handleChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="px-4 px-md-5 pb-4 d-flex justify-content-between">
        <Button variant="secondary" onClick={closeModal} size="lg">
          Cancelar
        </Button>
        <Button variant="primary" size="lg" onClick={handleSaveItem}>
          Adicionar item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadFilesModal;
