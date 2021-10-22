import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import EditJobModalComponent from './EditJobModal';

const EditJobModal = ({ show, job, onHide, onDelete, jobIndex }) => {
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState([]);
  const [dataUrls, setDataUrls] = useState([]);

  const handleUpload = (readFiles) => {
    const newFiles = [];
    const newDataUrls = [];

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

  useEffect(() => {
    setFiles(job?.files);
    const newDataUrls = [];

    // eslint-disable-next-line no-unused-expressions
    job?.files.map((file) => newDataUrls.push(file.url));

    setDataUrls(newDataUrls);
  }, [job]);

  const handleEditClient = (e) => {
    onHide({ ...e, files }, jobIndex);
  };

  return (
    <EditJobModalComponent
      show={show}
      onHide={onHide}
      register={register}
      handleUpload={handleUpload}
      files={files}
      dataUrls={dataUrls}
      jobIndex={jobIndex}
      job={job}
      handleSubmit={handleSubmit(handleEditClient)}
      onDelete={onDelete}
    />
  );
};

export default EditJobModal;
