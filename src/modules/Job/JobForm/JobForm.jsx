import React from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import Select, { components } from 'react-select';

import JobSentModal from '../../../components/modals/JobSentModal';
import JobFormFooter from './JobFormFooter';
import JobListItem from './JobListItem';
import JobPreviewListItem from './JobPreviewListItem';
import Icon from '../../../components/Icon';
import LoadingState from '../../../components/LoadingState';
import Avatar from '../../../components/Avatar';
import AddJobModal from '../AddJobModal';
import EditJobModal from '../EditJobModal';
import PreviewELementModal from './PreviewElementModal';

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
  newlyCreatedID,
  previewElementId,
  previewJobId,
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
  openEditJobModal,
  openPreviewElementModal,
  showAddModal,
  showPreviewModal,
  showEditModal,
  onAddJobModalHide,
  onEditJobModalHide,
  onPreviewModalHide,
  onPreviewChange,
  onDeleteJob,
  handleAddJobModalSubmit,
  handleEditJobModalSubmit,
  jobToEdit,
  jobIndexToEdit,
  jobs,
  handleRemoveFile,
  handleAttachNew,
}) => (
  <>
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
          </Col>
          <Col
            md={{ offset: 1, span: 5 }}
            className="overflow-auto p-3"
            style={{ maxHeight: '70vh' }}
          >
            {!showPreview ? (
              <ul>
                {jobs.map((job, jobIndex) => (
                  <JobListItem
                    key={jobIndex}
                    files={job.files}
                    name={job.name}
                    description={job.description}
                    handleRemoveFile={handleRemoveFile}
                    jobIndex={jobIndex}
                    handleAttachNew={handleAttachNew}
                    openEditJobModal={openEditJobModal}
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
            ) : (
              <ul>
                {jobs.map((job, jobIndex) => (
                  <JobPreviewListItem
                    key={jobIndex}
                    files={job.files}
                    name={job.name}
                    description={job.description}
                    jobIndex={jobIndex}
                    openEditJobModal={openEditJobModal}
                    openPreviewElementModal={openPreviewElementModal}
                  />
                ))}
              </ul>
            )}
          </Col>
        </Row>
      </Container>

      <JobFormFooter
        files={files}
        index={index}
        saving={saving}
        handleViewItem={actions.handleViewItem}
        handleAddItem={actions.handleAddItem}
        handleCancel={actions.handleCancel}
        showPreview={showPreview}
      />
    </Form>

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

    <PreviewELementModal
      show={showPreviewModal}
      onHide={onPreviewModalHide}
      startElement={previewElementId}
      jobIndex={previewJobId}
      jobs={jobs}
      onPreviewChange={onPreviewChange}
    />

    <EditJobModal
      job={jobToEdit}
      handleSubmit={handleEditJobModalSubmit}
      onHide={onEditJobModalHide}
      show={showEditModal}
      jobIndex={jobIndexToEdit}
      onDelete={onDeleteJob}
    />
  </>
);

export default JobForm;
