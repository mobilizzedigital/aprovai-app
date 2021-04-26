import React from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

import UploadField from '../../../components/UploadField';
import JobSentModal from '../../../components/modals/JobSentModal';
import JobReview from '../JobReview';
import JobFormFooter from './JobFormFooter';

const JobForm = ({
  errors,
  files,
  form,
  index,
  isPackage,
  newlyCreatedID,
  showPreview,
  saving,
  actions,
  descriptionLength,
}) => (
  <>
    {showPreview && (
      <JobReview
        id="new"
        title={form.Titulo}
        saving={saving}
        files={actions.convertFiles(files)}
        onCancel={actions.handleCancelPreview}
        onConfirm={actions.saveJob}
        onRemoveItem={actions.handleRemoveItem}
      />
    )}

    {!showPreview && (
      <Form onSubmit={actions.handleSubmit}>
        <Container className="pb-5 mb-5">
          <Row className="pb-5">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Nome do job</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  name="Titulo"
                  ref={actions.register({ required: true })}
                />
                {errors.Titulo && (
                  <Form.Text className="text-danger">
                    Nome do job obrigatório!
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Descrição do job</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  size="lg"
                  name="Descricao"
                  ref={actions.register({ maxLength: 500 })}
                />
                <Form.Text
                  className={descriptionLength > 500 ? 'text-danger' : ''}
                >
                  {descriptionLength}/500
                  {descriptionLength > 500 &&
                    ' - Você atingiu o limite permitido de caracteres!'}
                </Form.Text>
              </Form.Group>

              {isPackage && (
                <div className="d-flex justify-content-end mt-5 pb-4">
                  {files.length > 1 && (
                    <Button
                      variant="light"
                      size="lg"
                      onClick={() => actions.handleRemoveItem(index)}
                    >
                      Excluir item
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="lg"
                    className="ml-5"
                    onClick={actions.handleAddItem}
                  >
                    Adicionar item
                  </Button>
                </div>
              )}
            </Col>
            <Col md={{ offset: 1, span: 5 }}>
              <UploadField
                file={files[index].dataUrl}
                handleUpload={actions.handleUpload}
                multiple={isPackage}
              />
            </Col>
          </Row>
        </Container>

        <JobFormFooter
          files={files}
          index={index}
          saving={saving}
          isPackage={isPackage}
          handleViewItem={actions.handleViewItem}
          handleAddItem={actions.handleAddItem}
          handleCancel={actions.handleCancel}
        />
      </Form>
    )}

    <JobSentModal
      show={!!newlyCreatedID}
      newlyCreatedID={newlyCreatedID}
      onHide={actions.handleHideSentModal}
    />
  </>
);

export default JobForm;
