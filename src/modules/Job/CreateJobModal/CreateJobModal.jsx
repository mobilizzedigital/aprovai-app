import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Select, { components } from 'react-select';

import Icon from '../../../components/Icon';
import LoadingState from '../../../components/LoadingState';
import Avatar from '../../../components/Avatar';
import { JOB_TYPES } from '../../../constants';

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

const CreateJobModal = ({
  show,
  onHide,
  handleSubmit,
  loading,
  clientsData,
  handleAddClient,
  handleSelectClient,
  register,
  errors,
  client,
  showErrorClient,
}) => (
  <Modal show={show} onHide={onHide} centered>
    <Form onSubmit={handleSubmit}>
      <Modal.Header className="px-4 px-md-5 pt-4" closeButton>
        <Modal.Title>Vamos criar um job?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 px-md-5">
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
                <Form.Group controlId="name">
                  <Form.Label>Nome do job</Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    name="name"
                    ref={register({ required: true })}
                  />
                  {errors.name && (
                    <Form.Text className="text-danger">
                      Nome do job obrigatório!
                    </Form.Text>
                  )}
                </Form.Group>
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
                      Cliente obrigatório! Selecione um cliente para continuar.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="type">
                  <Form.Label>Tipo de envio</Form.Label>
                  <Row>
                    <Col sm={6}>
                      <label
                        className="field-box w-100"
                        htmlFor="type-separate"
                      >
                        <input
                          className="field-box-control d-none"
                          type="radio"
                          name="type"
                          value={JOB_TYPES.separate}
                          id="type-separate"
                          ref={register}
                          defaultChecked
                        />
                        <div className="field-box-wrapper rounded border px-2 pt-4 pb-3 text-center">
                          <Icon
                            name={Icon.types.email}
                            screenReaderMessage="Ícone Avulso"
                            className="field-box-icon mb-4 d-block"
                          />
                          <h4 className="field-box-label">Avulso</h4>
                          <p className="field-box-text m-0">
                            Envio de apenas um item para aprovação
                          </p>
                        </div>
                      </label>
                    </Col>
                    <Col sm={6}>
                      <label className="field-box w-100" htmlFor="type-package">
                        <input
                          className="field-box-control d-none"
                          type="radio"
                          name="type"
                          value={JOB_TYPES.package}
                          ref={register}
                          id="type-package"
                        />
                        <div className="field-box-wrapper rounded border px-2 pt-4 pb-3 text-center">
                          <Icon
                            name={Icon.types.package}
                            screenReaderMessage="Ícone Pacote"
                            className="field-box-icon mb-4 d-block"
                          />
                          <h4 className="field-box-label">Pacote</h4>
                          <p className="field-box-text m-0">
                            É possível adicionar e enviar vários itens
                          </p>
                        </div>
                      </label>
                    </Col>
                  </Row>
                </Form.Group>
              </>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="px-4 px-md-5 pb-4 d-flex justify-content-between">
        {clientsData.length ? (
          <>
            <Button variant="light" onClick={onHide} size="lg">
              Cancelar
            </Button>
            <Button variant="primary" size="lg" type="submit">
              Adicionar job
            </Button>
          </>
        ) : null}
      </Modal.Footer>
    </Form>
  </Modal>
);

export default CreateJobModal;
