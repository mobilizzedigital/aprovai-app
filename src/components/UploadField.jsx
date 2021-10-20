import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '../utils';
import Icon from '../components/Icon';

const defaultText = 'Clique ou arraste para fazer upload do arquivo';

const UploadField = ({
  dataUrls,
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
        ])}
      >
        {console.log(dataUrls)}
        {dataUrls.length > 0 && dataUrls[0] !== '' ? (
          dataUrls.length === 1 ? (
            <img className="field-upload-image" src={dataUrls} alt="" />
          ) : (
            <div className="container w-100 h-100 d-block position-relative">
              <div className="row">
                {dataUrls[0] ? (
                  <img
                    className="col img-thumbnail m-1"
                    src={dataUrls[0]}
                    alt=""
                  />
                ) : (
                  <div className="col m-1"></div>
                )}
                {dataUrls[1] ? (
                  <img
                    className="col img-thumbnail m-1"
                    src={dataUrls[1]}
                    alt=""
                  />
                ) : (
                  <div className="col m-1"></div>
                )}
              </div>
              <div className="row">
                {dataUrls[2] ? (
                  <img
                    className="col img-thumbnail m-1"
                    src={dataUrls[2]}
                    alt=""
                  />
                ) : (
                  <div className="col m-1"></div>
                )}
                {dataUrls[3] ? (
                  <img
                    className="col img-thumbnail m-1"
                    src={dataUrls[3]}
                    alt=""
                  />
                ) : (
                  <div className="col m-1"></div>
                )}
              </div>
              {dataUrls.length > 4 ? (
                <div
                  className="p-1 w-50 h-50 position-absolute"
                  style={{ bottom: 0, right: 0 }}
                >
                  <h2
                    className="bg-secondary m-0 w-100 h-100 rounded justify-content-center align-items-center d-flex"
                    style={{ opacity: 0.9 }}
                  >
                    +{dataUrls.length - 4}
                  </h2>
                </div>
              ) : (
                <></>
              )}
            </div>
          )
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
