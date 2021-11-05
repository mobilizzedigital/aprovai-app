import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const PreviewElementModal = ({
  show,
  jobs,
  startElement,
  jobIndex,
  onHide,
  onPreviewChange,
}) => (
  <Modal show={show} onHide={onHide} centered style={{ opacity: 0.9 }}>
    <Modal.Body className="px-4 px-md-5 pt-4 text-center bg-dark rounded position-relative">
      {show ? (
        <>
          <img
            src={jobs[jobIndex].files[startElement].url}
            alt="job file"
            className="w-100"
          />
          <p className="my-2 mx-0 text-white text-center text-break">
            {jobs[jobIndex].description}
          </p>
          <Button
            onClick={() => onPreviewChange(jobs[jobIndex], 'previews')}
            variant="dark"
            className="position-absolute top-50"
            style={{
              left: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 60,
              fontWeight: 1,
            }}
          >
            {'<'}
          </Button>
          <Button
            onClick={() => onPreviewChange(jobs[jobIndex], 'next')}
            variant="dark"
            className="position-absolute top-50 "
            style={{
              right: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 60,
              fontWeight: 1,
            }}
          >
            {'>'}
          </Button>
        </>
      ) : (
        <></>
      )}
    </Modal.Body>
  </Modal>
);

export default PreviewElementModal;
