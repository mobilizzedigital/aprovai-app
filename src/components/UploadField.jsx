import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '../utils';
import Icon from '../components/Icon';

const defaultText = 'Clique ou arraste para fazer upload do arquivo';

const UploadField = ({
  file,
  multiple = false,
  infoText = defaultText,
  handleUpload,
}) => {
  const onReadFiles = (files) => {
    const readFiles = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve([reader.result, file]);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readFiles).then(handleUpload);
  };

  const onDrop = useCallback(onReadFiles, [handleUpload]);

  const accept = 'image/png, image/jpg, image/jpeg, image/gif';
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps({})} />
      <div
        className={cn([
          'field-upload rounded border d-flex justify-content-center align-items-center flex-column',
          !file ? 'p-4' : '',
        ])}
      >
        {file ? (
          <img className="field-upload-image" src={file} alt="" />
        ) : (
          <>
            <Icon
              name={Icon.types.plus}
              className="field-upload-icon mb-3 d-block"
            />
            <p className="field-upload-text text-center">{infoText}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadField;
