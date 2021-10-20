import React from 'react';
import { Button } from 'react-bootstrap';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/Icon';

const JobListItem = ({
  name,
  description,
  files,
  handleRemoveFile,
  jobIndex,
}) => (
  <li className="bg-white rounded shadow p-3 mb-5">
    <div className="w-100 position-relative">
      <strong>{name}</strong>
      <span
        className="position-absolute align-items-center"
        style={{ right: 0 }}
      >
        <Icon name={Icon.types.pencil} />
        editar
      </span>
    </div>
    <table className="jobs-list-table bg-white w-100 my-2 border-top border-bottom">
      <tbody>
        {files?.length > 0 ? (
          files.map((file, index) => (
            <tr className="text-center" key={index}>
              <td className="d-flex py-2">
                <Avatar src={file.dataUrl} className="mr-3" />
                <span>{file.name}</span>
              </td>
              <td className="mr-0 py-2">
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
    <Button variant="light" size="lg">
      <span>Anexar</span>
      <Icon className="ml-3" name={Icon.types.link} />
    </Button>
    <div className="border-top w-100 m-0 p-1">
      <p>{description}</p>
    </div>
  </li>
);

export default JobListItem;
