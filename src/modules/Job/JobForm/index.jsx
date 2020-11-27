import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

import { JobsAPI } from '../../../api';
import { JOB_TYPES } from '../../../constants';
import ROUTES from '../../../routes';
import JobFormComponent from './JobForm';

const emptyFile = { dataUrl: '', file: {} };

const convertFiles = files => {
  return files.map(({ dataUrl }, index) => ({ id: index, endereco: dataUrl }));
};

const JobForm = ({ id, name, type, client }) => {
  const [files, setFiles] = useState([emptyFile]);
  const [index, setIndex] = useState(0);
  const [newlyCreatedID, setNewlyCreatedID] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [isPackage, setIsPackage] = useState(type === JOB_TYPES.package);
  const [clientId, setClientId] = useState(client);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    getValues,
    watch
  } = useForm();
  const descriptionValue = watch('Descricao');
  const { addToast } = useToasts();
  const history = useHistory();

  const handleViewItem = i => {
    if (i !== index) {
      setIndex(i);
    }
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

  const handleRemoveItem = indexToRemove => {
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

  const handleUpload = readFiles => {
    let newFiles = [];
    let isUpdating = false;

    /** Is multiple files */
    if (readFiles.length > 1) {
      if (files.length > 1) {
        /** Is adding more files to the list */
        newFiles = [
          ...files.filter(({ dataUrl }) => dataUrl.length > 0),
          ...readFiles.map(([dataUrl, file]) => ({ dataUrl, file }))
        ];
      } else {
        /** Is adding the initial files */
        newFiles = readFiles.map(([dataUrl, file]) => ({ dataUrl, file }));
      }
    } else {
      const [dataUrl, file] = readFiles[0];

      newFiles = files.map((f, i) => {
        if (i !== index) return f;
        return { dataUrl, file };
      });

      isUpdating = newFiles.length === files.length;

      /** Mark file to be removed */
      if (id && isUpdating) {
        const { file } = files.filter((_, i) => i === index)[0];

        if (file && file.id) {
          setFilesToRemove([...filesToRemove, file.id]);
        }
      }
    }

    setFiles(newFiles);
    if (!isUpdating) {
      setIndex(newFiles.length - 1);
    }
  };

  const handleHideSentModal = () => history.push(ROUTES.jobs);
  const handleCancel = () => history.goBack();
  const handleCancelPreview = () => setShowPreview(false);

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
    formData.append('IdCliente', clientId);

    files.forEach(({ file }, index) => {
      formData.append(`file_${index}`, file);
    });

    setSaving(true);

    /**
     * Delete any file from package that has been updated
     * since the API does not provide methods for that
     */
    if (id && filesToRemove.length > 0) {
      filesToRemove.forEach(id => deletePackageFile(id, true));
    }

    try {
      const { data } = await JobsAPI.saveJob(formData);

      await JobsAPI.addProgress({
        idProjeto: data.id,
        situacao: id ? 'Re-enviado' : 'Enviado'
      });

      addToast(`Job ${id ? 'editado' : 'cadastrado'} com sucesso!`, {
        appearance: 'success'
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
      Descricao: getValues('Descricao')
    });

    if (isPackage) {
      setShowPreview(true);
    } else {
      saveJob();
    }
  };

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
        const files = data.urlArquivo.map(file => ({
          dataUrl: file.endereco,
          file
        }));

        setValue('Titulo', data.titulo);
        setValue('Descricao', data.descricao);
        setFiles(files);
        setIsPackage(data.tipoProjeto === JOB_TYPES.package);
        setClientId(data.idCliente);
      } catch (e) {}
    };

    if (id) {
      fetchJobData();
    }
  }, [id, setValue]);

  const actions = {
    convertFiles,
    handleAddItem,
    handleCancel,
    handleCancelPreview,
    handleHideSentModal,
    handleRemoveItem,
    handleSubmit: handleSubmit(onSubmit),
    handleUpload,
    handleViewItem,
    register,
    saveJob
  };

  return (
    <JobFormComponent
      actions={actions}
      errors={errors}
      files={files}
      form={form}
      index={index}
      isPackage={isPackage}
      newlyCreatedID={newlyCreatedID}
      showPreview={showPreview}
      saving={saving}
      descriptionLength={descriptionValue ? descriptionValue.length : 0}
    />
  );
};

export default JobForm;
