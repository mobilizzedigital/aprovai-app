import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import AddJobModalComponent from './AddJobModal';

const AddJobModal = ({ show, onHide }) => {
  const { register, handleSubmit } = useForm();

  const [files, setFiles] = useState([]);
  const [dataUrls, setDataUrls] = useState([]);

  const handleUpload = (readFiles) => {
    let newFiles = [];
    let newDataUrls = [];

    readFiles.forEach((file) => {
      newFiles.push({
        url: file[0],
        name: file[1].name,
      });
      newDataUrls.push(file[0]);
    });

    setFiles(newFiles);
    setDataUrls(newDataUrls);
  };

  const handleAddClient = (e) => {
    onHide({ ...e, files });
  };

  return (
    <AddJobModalComponent
      show={show}
      onHide={onHide}
      register={register}
      handleUpload={handleUpload}
      files={files}
      dataUrls={dataUrls}
      handleSubmit={handleSubmit(handleAddClient)}
    />
  );
};

export default AddJobModal;
