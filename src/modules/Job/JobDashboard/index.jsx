import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

import JobDashboardComponent from './JobDashboard';
import { JobsAPI, ClientsAPI } from '../../../api';
import { JOB_TYPES, PROGRESS_TYPES } from '../../../constants';
import { userSelector } from '../../../store';
import { formatTimelineItems } from '../../../utils';
import ROUTES from '../../../routes';

const JobDashboard = ({ id, setPageTitle }) => {
  const [job, setJob] = useState({});
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [index, setIndex] = useState(null);
  const [fileIndex, setFileIndex] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [requestChanges, setRequestChanges] = useState(false);
  const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBigPicture, setShowBitPicture] = useState(false);
  const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);
  const { addToast } = useToasts();
  const user = useSelector(userSelector);
  const jobType = job.tipoProjeto ? job.tipoProjeto : JOB_TYPES.separate;
  const history = useHistory();

  const handleConfirmRemoveItem = () => {
    if (job.detalhes.length > 1) {
      setJob({
        ...job,
        detalhes: job.detalhes.filter(
          (_, detalheIndex) => detalheIndex !== index
        ),
      });
      index > 0 ? setIndex(index - 1) : setIndex(0);
    }
    setShowRemoveItemModal(false);
  };

  const onRemoveItem = () => {
    setShowRemoveItemModal(true);
  };

  const handleCloseRemoveItemModal = () => {
    setShowRemoveItemModal(false);
  };

  const openEditModal = () => setShowEditModal(true);

  const handleCloseEditModal = (changedItem) => {
    setShowEditModal(false);
  };

  const handleCloseRequestChangesModal = () => history.push(ROUTES.home);

  const handleCloseBigPicture = () => setShowBitPicture(false);

  const handleOpenBigPicture = () => setShowBitPicture(true);

  const handleRemoveFile = (fileIndex) => {
    const detalhes = job.detalhes;

    detalhes[index].arquivos = detalhes[index].arquivos.filter(
      (_, index) => index !== fileIndex
    );

    setJob({ ...job, detalhes });
  };

  const handleAttachNew = (readFiles) => {
    const detalhes = job.detalhes;

    readFiles.forEach((file) => {
      detalhes[index].arquivos.push({
        id: null,
        idProjeto: 0,
        dataUrl: file[0],
        nome: file[1].name,
      });
    });

    console.log(detalhes);

    setJob({ ...job, detalhes });
  };

  const handleRequestChanges = async (description) => {
    setSaving(true);

    const data = {
      idProjeto: parseInt(id, 10),
      comentario: description,
      situacao: PROGRESS_TYPES.requestedAdjust,
    };

    try {
      await JobsAPI.addProgress(data);
      // Update the timeline items so that it can shows the next item to be approved
      const { data: timeline } = await JobsAPI.getProgress(id);
      setSaving(false);
      setRequestChanges(false);
      setTimeline(timeline.andamentos);

      // TODO
      // if (isPackage) {
      //   const hasMoreFilesToValidate = showNextFileToValidateIfExists(
      //     job.urlArquivo,
      //     timeline.andamentos
      //   );
      //   if (hasMoreFilesToValidate) {
      //     addToast('Ajuste no item solicitado com sucesso!', {
      //       appearance: 'success',
      //     });
      //   } else {
      //     setShowChangesModal(true);
      //   }
      // } else {
      //   setShowChangesModal(true);
      // }
    } catch (error) {
      setSaving(false);
    }
  };

  /**
   * Show the next file that is not approved/has changes requested if exists
   */
  const showNextFileToValidateIfExists = (files = [], timeline = []) => {
    let nextFileIndex = null;

    files.forEach(({ id, situacao }, index) => {
      let requestedChanges = false;
      const timelineItems = timeline.filter((timelineItem) => {
        if (timelineItem.idArquivo === id) {
          return true;
        }
        return false;
      });
      if (
        timelineItems.length > 0 &&
        timelineItems[timelineItems.length - 1].situacao === 'Ajuste'
      ) {
        requestedChanges = true;
      }
      if (
        nextFileIndex === null &&
        situacao !== 'Aprovado' &&
        !requestedChanges
      ) {
        nextFileIndex = index;
      }
    });

    if (nextFileIndex !== null) {
      setIndex(nextFileIndex);
      // There is another file to be approved
      return true;
    }
    // There is not
    return false;
  };

  const approveFile = async () => {
    const fileId = job.urlArquivo[index].id;

    try {
      await JobsAPI.approveJobFile(id, fileId);
      await JobsAPI.addProgress({
        idProjeto: parseInt(id, 10),
        idArquivo: parseInt(fileId, 10),
        situacao: PROGRESS_TYPES.fileApproved,
      });
      const { data: timeline } = await JobsAPI.getProgress(id);
      setTimeline(timeline.andamentos);
      setSaving(false);
      // Update file status
      const jobUpdated = {
        ...job,
        urlArquivo: job.urlArquivo.map((file) => {
          if (file.id === fileId) return { ...file, situacao: 'Aprovado' };
          return file;
        }),
      };
      setJob(jobUpdated);
      console.log(jobUpdated);
      // File approved, should now check for more files to be approved
      const hasMoreFilesToValidate = showNextFileToValidateIfExists(
        jobUpdated.urlArquivo,
        timeline.andamentos
      );
      if (hasMoreFilesToValidate) {
        addToast('Arquivo aprovado!', { appearance: 'success' });
      } else {
        addToast(
          'Pronto, jobs foram enviados! você receberá uma notificação por e-mail quando receberem uma atualização.',
          { appearance: 'success' }
        );
        history.push(ROUTES.home);
      }
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
      setSaving(false);
    }
  };

  const approveJob = async () => {
    try {
      await JobsAPI.approveJob(id);
      await JobsAPI.addProgress({
        idProjeto: parseInt(id, 10),
        situacao: PROGRESS_TYPES.approved,
      });

      setSaving(false);
      setJob({ ...job, situacao: 'Aprovado' });
      addToast('Projeto aprovado!', { appearance: 'success' });
      history.push(ROUTES.home);
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
      setSaving(false);
    }
  };

  const handleApprove = () => {
    setSaving(true);
    approveFile();
  };

  const getTimelineItemsFiltered = () => {
    if (jobType === JOB_TYPES.separate) return timeline;

    return timeline.filter((item) => {
      if (!item.idArquivo || item.idArquivo === job.urlArquivo[index || 0].id) {
        return true;
      }

      return false;
    });
  };

  const setViewedJob = useCallback(() => {
    (async () => {
      const hasViewed =
        timeline.filter((p) => p.situacao === PROGRESS_TYPES.viewed).length > 0;

      if (!user.isAdmin && !hasViewed) {
        try {
          await JobsAPI.addProgress({
            idProjeto: job.id,
            situacao: PROGRESS_TYPES.viewed,
          });

          setTimeline([
            ...timeline,
            {
              comentario: null,
              dataAndamento: new Date(),
              id: 0,
              logoUrl: user.profilePicture,
              situacao: 'Visualizado',
              usuario: user.name,
            },
          ]);
        } catch (e) {}
      }
    })();
  }, [job.id, timeline, user]);

  const setViewedFile = useCallback(() => {
    (async () => {
      const fileId = job.urlArquivo[index].id;
      const progress = timeline.filter(
        (p) => p.idArquivo === fileId && p.situacao === PROGRESS_TYPES.viewed
      );
      const hasViewed = progress.length > 0;

      if (!user.isAdmin && !hasViewed) {
        try {
          await JobsAPI.addProgress({
            idProjeto: job.id,
            idArquivo: parseInt(fileId, 10),
            situacao: PROGRESS_TYPES.viewed,
          });

          setTimeline([
            ...timeline,
            {
              comentario: null,
              dataAndamento: new Date(),
              id: 0,
              idArquivo: fileId,
              logoUrl: user.profilePicture,
              situacao: 'Visualizado',
              usuario: user.name,
            },
          ]);
        } catch (e) {}
      }
    })();
  }, [index, user, job, timeline]);

  const handleSetViewedTimeline = useCallback(() => {
    if (!user.isAdmin) {
      if (jobType === JOB_TYPES.separate) {
        setViewedJob();
      } else {
        setViewedFile();
      }
    }
  }, [jobType, user.isAdmin, setViewedFile, setViewedJob]);

  useEffect(handleSetViewedTimeline, [index]);

  useEffect(() => {
    setFileIndex(0);
  }, [index]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await JobsAPI.getJob(id);
        const { data: client } = await ClientsAPI.getClient(data.idCliente);
        const { data: timeline } = await JobsAPI.getProgress(id);

        setJob(data);
        setClient(client.empresa);
        setPageTitle(data.titulo);
        setLoading(false);
        setTimeline(timeline.andamentos);
        setIndex(0);
      } catch (error) {}
    };

    fetchData();
  }, [id, setPageTitle]);

  if (loading) return null;

  const progressItems = getTimelineItemsFiltered();

  return (
    <JobDashboardComponent
      approveJob={handleApprove}
      client={client}
      handleRequestChanges={handleRequestChanges}
      index={index || 0}
      fileIndex={fileIndex || 0}
      job={job}
      timeline={formatTimelineItems(progressItems)}
      progressItems={progressItems}
      requestChanges={requestChanges}
      saving={saving}
      setIndex={setIndex}
      setFileIndex={setFileIndex}
      setEdit
      openEditModal={openEditModal}
      showEditModal={showEditModal}
      handleCloseEditModal={handleCloseEditModal}
      setRequestChanges={setRequestChanges}
      showRequestChangesModal={showRequestChangesModal}
      handleCloseRequestChangesModal={handleCloseRequestChangesModal}
      showBigPicture={showBigPicture}
      handleCloseBigPicture={handleCloseBigPicture}
      handleOpenBigPicture={handleOpenBigPicture}
      onRemoveItem={onRemoveItem}
      handleConfirmRemoveItem={handleConfirmRemoveItem}
      showRemoveItemModal={showRemoveItemModal}
      handleCloseRemoveItemModal={handleCloseRemoveItemModal}
      handleAttachNew={handleAttachNew}
      handleRemoveFile={handleRemoveFile}
      user={user}
    />
  );
};

export default JobDashboard;
