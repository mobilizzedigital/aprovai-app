import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useHistory, useLocation } from 'react-router-dom';

import { JobsAPI, ClientsAPI } from '../../../api';
import ROUTES from '../../../routes';
import JobFormComponent from './JobForm';

const emptyFile = { dataUrl: '', file: {} };

const convertFiles = (files) => {
  return files.map(({ dataUrl }, index) => ({ id: index, endereco: dataUrl }));
};

const mapClientToSelect = ({ id, nome, enderecoLogo }) => ({
  value: id,
  label: nome,
  logo: enderecoLogo,
});

const JobForm = ({ id, name, type }) => {
  const [files, setFiles] = useState([emptyFile]);
  const [toRefresh, setToRefresh] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [newlyCreatedID, setNewlyCreatedID] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({});
  const [jobs, setJobs] = useState([]);
  const [jobToEdit, setJobToEdit] = useState();
  const [jobIndexToEdit, setJobIndexToEdit] = useState();
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [showErrorClient, setShowErrorClient] = useState(false);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const { register, handleSubmit, errors, reset, setValue, getValues, watch } =
    useForm();
  const descriptionValue = watch('Descricao');
  const { addToast } = useToasts();
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const openAddJobModal = () => {
    setShowAddModal(true);
  };

  const onAddJobModalHide = (job) => {
    if (job && job.name) setJobs([...jobs, job]);
    setShowAddModal(false);
  };

  const openEditJobModal = (jobIndex) => {
    setJobIndexToEdit(jobIndex);
    setJobToEdit(jobs[jobIndex]);
    setShowEditModal(true);
  };

  const onEditJobModalHide = (job, jobIndex) => {
    const jobsToEdit = jobs;
    jobsToEdit[jobIndex] = job;
    setJobs(jobsToEdit);
    setShowEditModal(false);
  };

  const onDeleteJob = (jobIndex) => {
    setJobs((currentJobs) => currentJobs.filter((job, i) => i !== jobIndex));
    setShowEditModal(false);
  };

  const handleAttachNew = (readFiles, jobIndex) => {
    const job = jobs[jobIndex];
    const updatedJobs = jobs;
    readFiles.forEach((file) => {
      job.files.push({
        url: file[0],
        name: file[1].name,
      });
    });
    updatedJobs[jobIndex] = job;

    setToRefresh(!toRefresh);
    setJobs(updatedJobs);
  };

  const handleAddItem = () => {
    const newFiles = [...files, emptyFile];
    setFiles(newFiles);
    setIndex(newFiles.length - 1);
  };

  const deletePackageFile = async (id, silent = false) => {
    try {
      await JobsAPI.deleteFile(id);
      if (!silent) {
        addToast('Arquivo excluído com sucesso!', { appearance: 'success' });
      }
      return true;
    } catch (e) {
      addToast(e.message, { appearance: 'error' });
      return false;
    }
  };

  const handleRemoveFile = (jobIndex, fileIndex) => {
    const job = jobs[jobIndex];
    const updatedJobs = jobs;
    job.files.splice(fileIndex, 1);
    updatedJobs[jobIndex] = job;

    setToRefresh(!toRefresh);
    setJobs(updatedJobs);
  };

  const handleRemoveItem = (indexToRemove) => {
    const removeFileVisually = () => {
      const remainingFiles = files.filter((_, i) => i !== indexToRemove);
      if (index > remainingFiles.length - 1) {
        setIndex(index - 1);
      }
      setFiles(remainingFiles);
    };

    if (id) {
      const { file } = files.filter((_, i) => i === indexToRemove)[0];

      if (deletePackageFile(file.id)) {
        removeFileVisually();
      }
    } else {
      removeFileVisually();
    }
  };

  const handleHideSentModal = () => history.push(ROUTES.jobs);
  const handleCancel = () => history.goBack();
  const handleCancelPreview = () => setShowPreview(false);
  const handleSelectClient = (client) => setClient(client);

  const saveJob = async () => {
    const formData = new FormData();

    if (id) {
      formData.append('Id', parseInt(id, 10));
    } else {
      formData.append('TipoProjeto', type);
    }
    formData.append('Titulo', form.Titulo || getValues('Titulo'));

    const description = form.Descricao || getValues('Descricao');
    if (description) {
      formData.append('Descricao', description);
    }
    // formData.append('IdCliente', clientId);

    files.forEach(({ file }, index) => {
      formData.append(`file_${index}`, file);
    });

    setSaving(true);

    /**
     * Delete any file from package that has been updated
     * since the API does not provide methods for that
     */
    if (id && filesToRemove.length > 0) {
      filesToRemove.forEach((id) => deletePackageFile(id, true));
    }

    try {
      const { data } = await JobsAPI.saveJob(formData);

      await JobsAPI.addProgress({
        idProjeto: data.id,
        situacao: id ? 'Re-enviado' : 'Enviado',
      });

      addToast(`Job ${id ? 'editado' : 'cadastrado'} com sucesso!`, {
        appearance: 'success',
      });
      setNewlyCreatedID(data.id);
      reset();
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
    }

    setSaving(false);
  };

  const validateFileByFile = () => {
    let hasEmptyFile = false;

    files.forEach(({ dataUrl }, index) => {
      if (dataUrl === '') {
        hasEmptyFile = true;

        const message =
          'Ops, falta anexar a imagem que deseja que seu cliente aprove!';

        addToast(message, { appearance: 'error' });
      }
    });

    return hasEmptyFile;
  };

  const onSubmit = () => {
    if (validateFileByFile()) {
      return false;
    }

    setForm({
      Titulo: getValues('Titulo'),
      Descricao: getValues('Descricao'),
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ClientsAPI.getClients(100);

        setClients(data.empresas);
        setLoading(false);

        const clientId = query.get('client');

        if (clientId) {
          const foundClient = data.empresas.filter(
            (client) => client.id === parseInt(clientId, 10)
          )[0];

          // this piece is broken, requires maintenance
          // setClient(mapClientToSelect(foundClient));
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showPreview && form.Titulo && form.Descricao) {
      setValue('Titulo', form.Titulo);
      setValue('Descricao', form.Descricao);
    }
  }, [showPreview, form, setValue]);

  useEffect(() => {
    if (name) {
      setValue('Titulo', decodeURI(name));
    }
  }, [name, setValue]);

  useEffect(() => {
    /** Load data from Job */
    const fetchJobData = async () => {
      try {
        const { data } = await JobsAPI.getJob(id);
        const files = data.urlArquivo.map((file) => ({
          dataUrl: file.endereco,
          file,
        }));

        setValue('Titulo', data.titulo);
        setValue('Descricao', data.descricao);
        setFiles(files);
      } catch (e) {}
    };

    if (id) {
      fetchJobData();
    }
  }, [id, setValue]);

  const clientsData = clients.map(mapClientToSelect);

  const actions = {
    convertFiles,
    handleAddItem,
    handleCancel,
    handleCancelPreview,
    handleHideSentModal,
    handleRemoveItem,
    handleSubmit: handleSubmit(onSubmit),
    register,
    saveJob,
  };

  return (
    <JobFormComponent
      actions={actions}
      errors={errors}
      files={files}
      form={form}
      index={index}
      newlyCreatedID={newlyCreatedID}
      showPreview={showPreview}
      saving={saving}
      descriptionLength={descriptionValue ? descriptionValue.length : 0}
      openAddJobModal={openAddJobModal}
      onAddJobModalHide={onAddJobModalHide}
      showAddModal={showAddModal}
      openEditJobModal={openEditJobModal}
      onEditJobModalHide={onEditJobModalHide}
      showEditModal={showEditModal}
      jobToEdit={jobToEdit}
      jobIndexToEdit={jobIndexToEdit}
      client={client}
      showErrorClient={showErrorClient}
      clientsData={clientsData}
      handleSelectClient={handleSelectClient}
      jobs={jobs}
      handleRemoveFile={handleRemoveFile}
      handleAttachNew={handleAttachNew}
      onDeleteJob={onDeleteJob}
    />
  );
};

export default JobForm;
