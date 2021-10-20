import React from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

import Icon from '../../../components/Icon';
import BottomBar from '../../../components/BottomBar';
import CreatedClientModal from '../../../components/modals/CreatedClientModal';
import DeleteClientModal from '../../../components/modals/DeleteClientModal';
import UploadField from '../../../components/UploadField';
import LoadingSpinnerButton from '../../../components/LoadingSpinnerButton';

const ClientForm = ({
  isEditForm,
  errors,
  approvers,
  file,
  saving,
  showModal,
  showDeleteModal,
  actions,
}) => (
  <Form className="mb-3" onSubmit={actions.handleSubmit}>
    <Container className="pb-5">
      <Row>
        <Col md={6}>
          <h2 className="mb-5 mt-4 mt-md-0">
            <strong>
              {isEditForm ? 'Ajustes do Cliente' : 'Adicione o Cliente'}
            </strong>
            {isEditForm ? ' e aprovadores' : ' e quem vai aprovar os Jobs'}
          </h2>

          <div className="mb-3">
            <Form.Group controlId="name">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do Cliente que você deseja adicionar"
                size="lg"
                name="name"
                ref={actions.register({ required: true })}
              />
              {errors.name && (
                <Form.Text className="text-danger">
                  Nome do cliente obrigatório!
                </Form.Text>
              )}
            </Form.Group>

            {approvers.map((a, i) => {
              const key = `approvers[${i}]`;
              const nameKey = `${key}.nome`;
              const emailKey = `${key}.email`;
              const idKey = `${key}.id`;

              return (
                <Row key={key}>
                  <Col xs={12} lg={6}>
                    <Form.Group controlId={nameKey}>
                      <Form.Label>Nome do aprovador</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nome do aprovador"
                        size="lg"
                        ref={actions.register({
                          required: i === 0,
                        })}
                        name={nameKey}
                      />
                      <Form.Control
                        type="hidden"
                        name={idKey}
                        ref={actions.register}
                      />
                      {errors[nameKey] && (
                        <Form.Text className="text-danger">
                          Nome obrigatório!
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} lg={6} className="position-relative">
                    <Form.Group controlId={emailKey}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email do aprovador"
                        size="lg"
                        ref={actions.register({
                          required: {
                            value: a.id === 1,
                            message: 'Email obrigatório!',
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Email inválido',
                          },
                        })}
                        name={emailKey}
                      />
                      {errors[emailKey] && (
                        <Form.Text className="text-danger">
                          {errors[emailKey].message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    {i !== 0 && (
                      <button
                        className="form-remove-control position-absolute border-0 bg-transparent"
                        type="button"
                        onClick={() => actions.handleDeleteApprover(a.id)}
                      >
                        <Icon
                          name={Icon.types.delete}
                          screenReaderMessage="Remover aprovador"
                        />
                      </button>
                    )}
                  </Col>
                </Row>
              );
            })}
            <button
              type="button"
              className="form-btn-plus border rounded py-3 px-4 bg-transparent text-black-50 mb-3"
              onClick={actions.handleAddApprover}
            >
              <Icon name={Icon.types.plus} />
            </button>

            {isEditForm && (
              <div className="mb-3">
                <Button
                  variant="link"
                  className="p-0 mt-4"
                  onClick={actions.handleShowDeleteModal}
                >
                  Excluir cliente
                </Button>
              </div>
            )}

            {!isEditForm && (
              <div className="form-message p-3 rounded font-weight-medium text-center">
                <p className="m-0">
                  Você sempre pode alterar o aprovador em 'configurações' no
                  menu do cliente
                </p>
              </div>
            )}
          </div>
        </Col>
        <Col md={{ offset: 1, span: 5 }}>
          <UploadField
            dataUrls={[file.dataUrl]}
            handleUpload={actions.handleUpload}
            infoText="Clique ou arraste uma foto de avatar do cliente"
          />
        </Col>
      </Row>
    </Container>

    <BottomBar>
      <div />
      <div>
        <Button
          variant="light"
          size="lg"
          className="px-md-5"
          onClick={actions.handleGoBack}
        >
          Cancelar
        </Button>
        <LoadingSpinnerButton
          variant="success"
          className="ml-3 ml-md-5 px-md-5"
          loading={saving}
        >
          {isEditForm ? 'Salvar alterações' : 'Concluir'}
        </LoadingSpinnerButton>
      </div>
    </BottomBar>

    <CreatedClientModal
      show={showModal}
      onHide={actions.handleHideModal}
      onClickNo={actions.handleShowClientsList}
      onClickYes={actions.handleShowCreateJobModal}
    />

    <DeleteClientModal
      show={showDeleteModal}
      onHide={actions.handleHideDeleteModal}
      onDelete={actions.handleDeleteClient}
    />
  </Form>
);

export default ClientForm;
