import React from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import Select, { components } from 'react-select';

import JobSentModal from '../../../components/modals/JobSentModal';
import JobReview from '../JobReview';
import JobFormFooter from './JobFormFooter';
import JobListItem from './JobListItem';
import Icon from '../../../components/Icon';
import LoadingState from '../../../components/LoadingState';
import Avatar from '../../../components/Avatar';
import AddJobModal from '../AddJobModal';

const Control = (props) => {
  const value = props.getValue();

  if (value && value.length) {
    return (
      <components.Control {...props} className="form-control-select">
        <div className="d-flex align-items-center justify-content-between w-100 px-2">
          <div className="d-flex align-items-center">
            <Avatar
              src={value[0].logo}
              alt={value[0].label}
              size={32}
              className="ml-1 mr-3"
            />
            {value[0].label}
          </div>
          <components.IndicatorsContainer {...props}>
            <components.IndicatorSeparator {...props} className="mr-2" />
            <components.DownChevron />
          </components.IndicatorsContainer>
        </div>
      </components.Control>
    );
  }

  return <components.Control {...props} className="form-control-select" />;
};

const Option = (props) => {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="d-flex align-items-center">
        <Avatar src={data.logo} alt={data.label} size={32} className="mr-3" />
        {data.label}
      </div>
    </components.Option>
  );
};

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
  loading,
  clientsData,
  handleAddClient,
  handleSelectClient,
  client,
  showErrorClient,
  register,
  openPopup,
  openAddJobModal,
  onAddJobModalHide,
  showAddModal,
  handleAddJobModalSubmit,
  jobs,
  handleRemoveFile,
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
              <h3 className="mb-4">
                <strong>Preencha</strong> as informações e adicione os jobs
              </h3>
              <Form.Group controlId="name">
                <Form.Label>Nome do job</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  name="name"
                  ref={actions.register({ required: true })}
                />
                {errors.name && (
                  <Form.Text className="text-danger">
                    Nome do job obrigatório!
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="clients">
                {loading ? (
                  <LoadingState message="Carregando clientes..." />
                ) : (
                  <>
                    {!clientsData.length ? (
                      <>
                        <p className="text-center">
                          Voce ainda não tem nenhum cliente cadastrado.
                        </p>
                        <p className="text-center">
                          <Button
                            variant="link"
                            className="text-primary p-0"
                            onClick={handleAddClient}
                          >
                            Click aqui
                          </Button>{' '}
                          para cadastrar um cliente e começar a criar seus jobs!
                        </p>
                      </>
                    ) : (
                      <>
                        <Form.Group controlId="client">
                          <Form.Label>Cliente</Form.Label>
                          <Select
                            options={clientsData}
                            isMulti={false}
                            onChange={handleSelectClient}
                            value={client}
                            placeholder="Selecione o cliente"
                            components={{
                              Control,
                              Option,
                            }}
                          />
                          {showErrorClient && (
                            <Form.Text className="text-danger">
                              Cliente obrigatório! Selecione um cliente para
                              continuar.
                            </Form.Text>
                          )}
                        </Form.Group>
                      </>
                    )}
                  </>
                )}
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
            <Col
              md={{ offset: 1, span: 5 }}
              className="overflow-auto p-3"
              style={{ maxHeight: '70vh' }}
            >
              <ul>
                {jobs.map((job, jobIndex) => (
                  <JobListItem
                    key={jobIndex}
                    files={job.files}
                    name={job.name}
                    description={job.description}
                    handleRemoveFile={handleRemoveFile}
                    jobIndex={jobIndex}
                  />
                ))}
                <li className="bg-white rounded shadow p-3">
                  <Button
                    variant="light"
                    size="lg"
                    className="w-100"
                    onClick={openAddJobModal}
                  >
                    <Icon name={Icon.types.plus} />
                    <span>Adicionar Item</span>
                  </Button>
                </li>
              </ul>
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
    <AddJobModal
      handleSubmit={handleAddJobModalSubmit}
      onHide={onAddJobModalHide}
      show={showAddModal}
    />
  </>
);

export default JobForm;
