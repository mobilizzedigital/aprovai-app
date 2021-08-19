import React from 'react';
import { Button, Form } from 'react-bootstrap';

import Icon from '../../../../components/Icon';
import Avatar from '../../../../components/Avatar';
import { useJobFormContext, useJobViewContext } from '../context';

const JobFormFiles = () => {
  const [{ items, formErrors }, dispatchForm] = useJobFormContext();
  const [{ isPreviewPage }, dispatchView] = useJobViewContext();

  const hasItems = items.length > 0;

  const editItem = (index) =>
    dispatchView({ type: 'open_upload_modal', payload: { index } });

  const uploadFileToItem = () => dispatchView({ type: 'open_upload_modal' });

  const uploadNewItem = () => dispatchView({ type: 'open_upload_modal' });

  const removeItem = (itemIndex, fileIndex) =>
    dispatchForm({ type: 'remove_item', value: { itemIndex, fileIndex } });

  return (
    <div className="d-flex flex-column h-100">
      {hasItems && (
        <>
          {items.map(({ name, description, files }, itemIndex) => (
            <div
              className="job-form-files shadow bg-white border-0 rounded w-100 text-left font-weight-medium mb-4"
              key={`items${itemIndex}`}
            >
              <div className="py-2">
                <div className="pb-2 px-3 d-flex align-items-center justify-content-between">
                  <strong>{name}</strong>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => editItem(itemIndex)}
                  >
                    <Icon name={Icon.types.pencil} />
                    Editar
                  </Button>
                </div>

                {isPreviewPage && (
                  <div className="d-flex px-3 mb-0">
                    {files.map(({ dataUrl, file: { name } }, itemIndex) => (
                      <Avatar
                        src={dataUrl}
                        className="mr-2"
                        size={70}
                        key={`preview_${name}${itemIndex}`}
                      />
                    ))}
                  </div>
                )}

                {!isPreviewPage && (
                  <ul className="px-3 mb-0">
                    {files.map(({ dataUrl, file: { name } }, fileIndex) => (
                      <li
                        className="border-top-light py-2 d-flex justify-content-between align-items-center"
                        key={`${name}${fileIndex}`}
                      >
                        <div className="d-flex align-items-center">
                          <Avatar src={dataUrl} className="mr-2" />
                          <span>{name}</span>
                        </div>

                        <Button
                          variant="light"
                          className="p-0"
                          onClick={() => removeItem(itemIndex, fileIndex)}
                        >
                          <Icon
                            name={Icon.types.delete}
                            className="mr-0 text-black-50"
                            style={{ fontSize: 18 }}
                          />
                        </Button>
                      </li>
                    ))}
                    <li className="border-top-light py-2 d-flex justify-content-between align-items-center">
                      {/* @TODO: Adicionar ícone de upload */}
                      <Button variant="light" onClick={uploadFileToItem}>
                        Anexar
                      </Button>
                    </li>
                  </ul>
                )}
                {description ? (
                  <div className="text-center border-top-light pt-2 px-3">
                    <p>{description} </p>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </>
      )}

      <div>
        <button
          className="job-form-files shadow bg-white border-0 p-4 rounded w-100 text-left font-weight-medium mb-4"
          type="button"
          onClick={uploadNewItem}
        >
          <span className="job-form-files__icon rounded d-inline-flex justify-content-center align-items-center mr-3">
            <Icon name={Icon.types.plus} />
          </span>
          <span>Adicionar Item</span>
        </button>
        {formErrors.files && (
          <Form.Text className="text-danger">
            Adicione um item para continuar!
          </Form.Text>
        )}
      </div>

      {!hasItems && (
        <div className="flex-fill flex-center">
          <p>Você ainda não adicionou nenhum item ao Job</p>
        </div>
      )}
    </div>
  );
};

export default JobFormFiles;
