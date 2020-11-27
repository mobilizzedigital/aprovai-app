import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ClientFormComponent from './ClientForm';
import { ClientsAPI } from '../../../api';
import ROUTES from '../../../routes';
import { toggleCreateJobModal, togglePlansModal } from '../../../store';
import { HTTP_ERROR_TYPES } from '../../../constants';

const defaultApprover = [{ id: 0, name: '', email: '', default: true }];

const ClientForm = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [approvers, setApprovers] = useState(defaultApprover);
  const [file, setFile] = useState({ dataUrl: '', file: {} });
  const [toClientsList, setToClientsList] = useState(false);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, errors, reset, setValue } = useForm();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();
  const isEditForm = !!id;

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  const handleShowDeleteModal = () => setDeleteModal(true);
  const handleHideDeleteModal = () => setDeleteModal(false);
  const handleShowCreateJobModal = () => {
    handleHideModal();
    dispatch(toggleCreateJobModal());
  };
  const handleShowClientsList = () => setToClientsList(true);

  const handleAddApprover = () =>
    setApprovers([
      ...approvers,
      { id: approvers.length + 1, name: '', email: '', default: false }
    ]);

  const handleDeleteApprover = async index => {
    if (isEditForm) {
      try {
        const approverEmail = approvers.filter(a => a.id === index)[0].email;
        await ClientsAPI.removeApprover(approverEmail);
        addToast('Aprovador excluído com sucesso!', { appearance: 'success' });
      } catch (error) {
        addToast('Não foi possível excluir este aprovador!', {
          appearance: 'error'
        });
      }
    } else {
      setApprovers(approvers.filter(a => a.id !== index));
    }
  };

  const handleUpload = files =>
    setFile({ dataUrl: files[0][0], file: files[0][1] });

  const handleGoBack = () => history.goBack();

  const handleDeleteClient = async () => {
    try {
      await ClientsAPI.deleteClient(id);

      addToast('Cliente excluído com sucesso!', { appearance: 'success' });
      history.push(ROUTES.clients);
    } catch (error) {
      addToast(error.response.data.message, { appearance: 'error' });
    }
  };

  const saveApprover = idCliente => approver =>
    new Promise(async (resolve, reject) => {
      try {
        await ClientsAPI.saveApprover({ ...approver, idCliente });
        resolve();
      } catch (error) {
        reject();
      }
    });

  const onSubmit = async ({ name, approvers }) => {
    setSaving(true);

    var formData = new FormData();

    if (id) {
      formData.append('Id', id);
    }
    formData.append('Nome', name);
    formData.append('Aprovadores', approvers);

    if (file.file !== null) {
      formData.append('file', file.file);
    } else {
      formData.append('enderecoLogo', file.dataUrl);
    }

    try {
      const { data } = await ClientsAPI.createClient(formData);
      const promises = approvers.map(saveApprover(data.model.id));

      const message = isEditForm
        ? 'Cliente atualizado com sucesso!'
        : 'Cliente criado com sucesso!';

      Promise.all(promises)
        .then(() => {
          setSaving(false);

          if (isEditForm) {
            addToast(message, { appearance: 'success' });
          } else {
            setFile({ dataUrl: '', file: {} });
            handleShowModal();
            reset();
          }
        })
        .catch(() => {
          setSaving(false);
          addToast(message, { appearance: 'success' });
          addToast('Aprovador já cadastrado!', { appearance: 'error' });
        });
    } catch (error) {
      setSaving(false);

      if (error.response.status === HTTP_ERROR_TYPES.badRequest) {
        dispatch(togglePlansModal({ hasExceedMaxClients: true }));
      } else {
        addToast(error.response.data.message, { appearance: 'error' });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { empresa }
        } = await ClientsAPI.getClient(id);

        if (empresa) {
          const approvers = empresa.aprovadores.reverse().map((apv, index) => ({
            id: apv.id,
            nome: apv.aprovador,
            email: apv.emailAprovador
          }));

          setApprovers(approvers);
          setValue('name', empresa.nome);
          setValue('approvers', approvers);

          if (empresa.enderecoLogo) {
            setFile({ dataUrl: empresa.enderecoLogo, file: null });
          }
        }
      } catch (error) {}
    };

    fetchData();
  }, [id, setValue, setFile]);

  if (toClientsList) {
    return <Redirect to={ROUTES.clients} />;
  }

  const actions = {
    register,
    handleUpload,
    handleGoBack,
    handleShowClientsList,
    handleAddApprover,
    handleDeleteApprover,
    handleShowDeleteModal,
    handleHideDeleteModal,
    handleHideModal,
    handleShowCreateJobModal,
    handleDeleteClient,
    handleSubmit: handleSubmit(onSubmit)
  };

  return (
    <ClientFormComponent
      showModal={showModal}
      showDeleteModal={showDeleteModal}
      saving={saving}
      errors={errors}
      actions={actions}
      approvers={approvers}
      file={file}
      isEditForm={isEditForm}
    />
  );
};

export default ClientForm;
