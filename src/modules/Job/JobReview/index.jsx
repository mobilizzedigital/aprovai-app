import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import JobReviewComponent from './JobReview';
import { JobsAPI } from '../../../api';
import { getEditJobRoute } from '../../../routes';

const JobReview = ({
  id,
  title,
  files,
  saving = false,
  onCancel = () => {},
  onConfirm = () => {},
  onRemoveItem = () => {}
}) => {
  const [job, setJob] = useState({});
  const isEdit = !!id && id !== 'new';
  const history = useHistory();

  const handleRemoveItem = itemId => {
    if (isEdit) {
      history.push(getEditJobRoute(id));
    } else {
      onRemoveItem(itemId);
    }
  };

  useEffect(() => {
    if (id === 'new') {
      setJob({ urlArquivo: files, titulo: title });
    }
  }, [id, title, files]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await JobsAPI.getJob(id);
        setJob(data);
      } catch (error) {}
    };

    if (id && id !== 'new') {
      fetchData();
    }
  }, [id]);

  return (
    <JobReviewComponent
      isEdit={isEdit}
      job={job}
      saving={saving}
      onRemoveItem={handleRemoveItem}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default JobReview;
