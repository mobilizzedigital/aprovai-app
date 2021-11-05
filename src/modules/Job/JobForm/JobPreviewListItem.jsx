import React from 'react';
import { Button } from 'react-bootstrap';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/Icon';

const JobPreviewListItem = ({
  name,
  description,
  files,
  jobIndex,
  openEditJobModal,
  openPreviewElementModal,
}) => (
  <li className="bg-white rounded shadow p-3 mb-5">
    <div className="w-100 position-relative">
      <strong>{name}</strong>
      <Button
        variant="light"
        size="sm"
        className="position-absolute align-items-center"
        style={{ right: 0 }}
        onClick={() => openEditJobModal(jobIndex)}
      >
        <Icon name={Icon.types.pencil} />
        editar
      </Button>
    </div>
    <ul className="list-group list-group-horizontal bg-white w-100 my-2 border-top border-bottom squared">
      {files[0] ? (
        <li className="rounded mx-3 my-2 position-relative pointer">
          <Button
            className="p-0 border"
            variant="light"
            size="sm"
            onClick={() => openPreviewElementModal(jobIndex, 0)}
          >
            <div
              className="w-100 h-100 rounded bg-dark align-items-center justify-content-center d-flex position-absolute"
              style={{ opacity: 0.8 }}
            >
              <Icon
                name={Icon.types.eye}
                className="text-white mr-0"
                size={24}
                style={{ opacity: 1 }}
              />
            </div>
            <Avatar size={60} src={files[0].url} className="m-1" />
          </Button>
        </li>
      ) : (
        <></>
      )}
      {files[1] ? (
        <li className="rounded mx-3 my-2 position-relative pointer">
          <Button
            className="p-0 border"
            variant="light"
            size="sm"
            onClick={() => openPreviewElementModal(jobIndex, 1)}
          >
            <Avatar size={60} src={files[1].url} className="m-1" />
          </Button>
        </li>
      ) : (
        <></>
      )}
      {files[2] ? (
        <li className="rounded mx-3 my-2 position-relative pointer">
          <Button
            className="p-0 border"
            variant="light"
            size="sm"
            onClick={() => openPreviewElementModal(jobIndex, 2)}
          >
            <Avatar size={60} src={files[2].url} className="m-1" />
          </Button>
        </li>
      ) : (
        <></>
      )}
      {files[3] ? (
        <li className="rounded mx-3 my-2 position-relative pointer">
          <Button
            className="p-0 border"
            variant="light"
            size="sm"
            onClick={() => openPreviewElementModal(jobIndex, 3)}
          >
            {files.length > 4 ? (
              <div
                className="w-100 h-100 rounded bg-dark align-items-center justify-content-center d-flex position-absolute"
                style={{ opacity: 0.8 }}
              >
                <Icon
                  name={Icon.types.plus}
                  className="text-white mr-0"
                  size={24}
                  style={{ opacity: 1 }}
                />
              </div>
            ) : (
              <></>
            )}
            <Avatar size={60} src={files[3].url} className="m-1" />
          </Button>
        </li>
      ) : (
        <></>
      )}
    </ul>
    <div className="w-100 mt-2 m-0 p-1 text-center">
      <p className="text-center text-break">{description}</p>
    </div>
  </li>
);

export default JobPreviewListItem;
