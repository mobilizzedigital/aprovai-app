import React from 'react';
import { Button } from 'react-bootstrap';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/Icon';
import UploadField from '../../../components/UploadField';

const JobListItem = ({
  name,
  description,
  files,
  handleRemoveFile,
  jobIndex,
  handleAttachNew,
  openEditJobModal,
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
    <table className="jobs-list-table bg-white w-100 mt-2 border-top border-bottom">
      <tbody>
        {files?.length > 0 ? (
          files.map((file, index) => (
            <tr className="text-left border-top" key={index}>
              <td className="d-flex py-2 align-items-center border-0">
                <Avatar src={file.url} className="mr-3" />
                <span>{file.name}</span>
              </td>
              <td className="mr-0 py-2 border-0">
                <Button
                  onClick={() => handleRemoveFile(jobIndex, index)}
                  variant="light"
                >
                  <Icon name={Icon.types.delete} />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </table>
    <Button variant="light" size="lg" className="my-2">
      <UploadField
        handleUpload={(readFiles) => handleAttachNew(readFiles, jobIndex)}
        multiple
      >
        <span>Anexar</span>
        <Icon className="ml-3" name={Icon.types.link} />
      </UploadField>
    </Button>
    <div className="border-top w-100 m-0 p-1">
      <p className="text-center text-break mt-3">{description}</p>
    </div>
  </li>
);

export default JobListItem;
