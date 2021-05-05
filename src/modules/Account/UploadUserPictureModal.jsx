import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';

import { UserAPI } from '../../api';
import UploadField from '../../components/UploadField';
import { userSelector, addUser } from '../../store';

const UploadUserPictureModal = ({ show, handleHide }) => {
  const [file, setFile] = useState({ dataUrl: '', file: {} });
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const handleUpload = (files) =>
    setFile({ dataUrl: files[0][0], file: files[0][1] });

  const handleSave = async () => {
    var formData = new FormData();

    formData.append('file', file.file ? file.file : file.dataUrl);
    formData.append('Name', user.name);
    formData.append('UserName', user.userName);
    formData.append('Email', user.email);

    try {
      await UserAPI.saveUser(formData);
      addToast('Foto atualizada com sucesso!', {
        appearance: 'success',
      });
      dispatch(addUser({ ...user, profilePicture: file.dataUrl }));
      handleHide();
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
    }
  };

  useEffect(() => {
    if (user) {
      setFile({ dataUrl: user.profilePicture, file: null });
    }
  }, [user]);

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header className="px-5 pt-4" closeButton>
        <Modal.Title>Faça upload da sua foto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5">
        <UploadField file={file.dataUrl} handleUpload={handleUpload} />
      </Modal.Body>
      <Modal.Footer className="px-5 pb-4 d-flex justify-content-between">
        <Button variant="light" onClick={handleHide} size="lg">
          Cancelar
        </Button>
        <Button variant="primary" size="lg" type="button" onClick={handleSave}>
          Salvar foto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadUserPictureModal;
