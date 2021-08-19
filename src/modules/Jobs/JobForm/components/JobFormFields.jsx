import React from 'react';
import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';
import Avatar from '../../../../components/Avatar';
import { useJobFormContext, useJobViewContext } from '../context';

const JobFormFields = () => {
  const [{ form, formErrors, clients }, dispatch] = useJobFormContext();
  const [{ isPreviewPage }] = useJobViewContext();

  const handleChangeName = ({ target }) => {
    dispatch({
      type: 'update_form',
      value: { name: target.value },
    });
  };

  const handleChangeClient = (client) => {
    dispatch({ type: 'update_form', value: { client } });
  };

  return (
    <>
      <h5 className="mb-4">
        {isPreviewPage ? (
          <>
            <b>Revise</b> o job antes de enviar para o cliente
          </>
        ) : (
          <>
            <b>Preencha</b> as informações e adicione os itens ao Job
          </>
        )}
      </h5>

      <Form.Group>
        <Form.Label>Nome do job</Form.Label>
        <Form.Control
          type="text"
          size="lg"
          name="Titulo"
          placeholder="Nome"
          value={form.name}
          onChange={handleChangeName}
        />
        {formErrors.name && (
          <Form.Text className="text-danger">
            Nome do job obrigatório!
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Cliente</Form.Label>
        <Select
          options={clients}
          isMulti={false}
          onChange={handleChangeClient}
          value={form.client}
          placeholder="Selecione o cliente"
          components={{
            Control: (props) => {
              const value = props.getValue();

              if (value && value.length) {
                return (
                  <components.Control
                    {...props}
                    className="form-control-select"
                  >
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
                        <components.IndicatorSeparator
                          {...props}
                          className="mr-2"
                        />
                        <components.DownChevron />
                      </components.IndicatorsContainer>
                    </div>
                  </components.Control>
                );
              }

              return (
                <components.Control
                  {...props}
                  className="form-control-select"
                />
              );
            },
            Option: (props) => {
              const { data } = props;

              return (
                <components.Option {...props}>
                  <div className="d-flex align-items-center">
                    <Avatar
                      src={data.logo}
                      alt={data.label}
                      size={32}
                      className="mr-3"
                    />
                    {data.label}
                  </div>
                </components.Option>
              );
            },
          }}
        />
        {formErrors.client && (
          <Form.Text className="text-danger">Cliente obrigatório!</Form.Text>
        )}
      </Form.Group>
    </>
  );
};

export default JobFormFields;
