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
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewElementId, setPreviewElementId] = useState(0);
  const [previewJobId, setPreviewJobId] = useState(0);
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

  const onPreviewChange = (job, destiny) => {
    if (destiny === 'next' && previewElementId + 1 < job.files.length) {
      console.log(previewElementId + 1);
      setPreviewElementId(previewElementId + 1);
    } else if (destiny === 'previews' && previewElementId - 1 >= 0) {
      console.log(previewElementId - 1);
      setPreviewElementId(previewElementId - 1);
    }
  };

  const openPreviewElementModal = (jobId, elementId) => {
    setPreviewElementId(elementId);
    setPreviewJobId(jobId);
    setShowPreviewModal(true);
  };

  const onPreviewModalHide = () => {
    setShowPreviewModal(false);
  };

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
  const handleSelectClient = (client) => setClient(client);
  const handleCancel = () => {
    if (showPreview) {
      setShowPreview(false);

      return;
    }
    history.goBack();
  };

  const saveJob = async () => {
    const body = {
      titulo: getValues('name'),
      idCliente: client.value,
      detalhes: jobs.map((job) => ({
        arquivos: job.files.map((file) => ({
          dataUrl: file.url,
          nome: file.name,
        })),
        descricao: job.description,
        nome: job.name,
      })),
    };

    setSaving(true);

    // /**
    //  * Delete any file from package that has been updated
    //  * since the API does not provide methods for that
    //  */
    // if (id && filesToRemove.length > 0) {
    //   filesToRemove.forEach((id) => deletePackageFile(id, true));
    // }

    try {
      const { data } = await JobsAPI.saveJob(body);

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

    jobs.forEach((job) => {
      job.files.forEach(({ dataUrl }, index) => {
        if (dataUrl === '') {
          hasEmptyFile = true;

          const message =
            'Ops, falta anexar as imagens que deseja que seu cliente aprove!';

          addToast(message, { appearance: 'error' });
        }
      });
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

    if (!showPreview) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
      saveJob();
    }
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
    handleCancel,
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
      handleSelectClient={handleSelectClient}
      handleRemoveFile={handleRemoveFile}
      handleAttachNew={handleAttachNew}
      openAddJobModal={openAddJobModal}
      openEditJobModal={openEditJobModal}
      onAddJobModalHide={onAddJobModalHide}
      onEditJobModalHide={onEditJobModalHide}
      onDeleteJob={onDeleteJob}
      onPreviewChange={onPreviewChange}
      showAddModal={showAddModal}
      showEditModal={showEditModal}
      showErrorClient={showErrorClient}
      showPreviewModal={showPreviewModal}
      jobToEdit={jobToEdit}
      jobIndexToEdit={jobIndexToEdit}
      client={client}
      clientsData={clientsData}
      jobs={jobs}
      openPreviewElementModal={openPreviewElementModal}
      onPreviewModalHide={onPreviewModalHide}
      previewElementId={previewElementId}
      previewJobId={previewJobId}
    />
  );
};

export default JobForm;
