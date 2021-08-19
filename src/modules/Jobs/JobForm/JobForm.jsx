import React from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';

import JobFormFields from './components/JobFormFields';
import JobFormFiles from './components/JobFormFiles';
import JobFormFooter from './components/JobFormFooter';
import UploadFilesModal from './components/UploadFilesModal';
import { useJobFormContext, useJobViewContext } from './context';
import { JobsAPI } from '../../../api';

const JobForm = () => {
  const [formState, formDispatch] = useJobFormContext();
  const [viewState, viewDispatch] = useJobViewContext();
  const { addToast } = useToasts();

  console.log(formState);

  const getCarouselFiles = async () => {
    const items = [];

    for (const item of formState.items) {
      try {
        const { data } = await JobsAPI.getCarouselId();
        const files = item.files.map((file) => ({
          ...file,
          IdCarrousel: data.carrouselId,
        }));
        items.push({ ...item, files });
      } catch (e) {
        console.log(e);
      }
    }

    return items;
  };

  const showFormErrors = () => {
    const hasNameError = !formState.form.name || !formState.form.name.trim();
    const hasClientError = !formState.form.client;
    const hasFilesError = !formState.items.length;
    formDispatch({
      type: 'set_validation_error',
      value: {
        name: hasNameError,
        client: hasClientError,
        files: hasFilesError,
      },
    });
  };

  const checkFormErrors = () => {
    const hasNameError = !formState.form.name || !formState.form.name.trim();
    const hasClientError = !formState.form.client;
    const hasFilesError = !formState.items.length;
    if (hasNameError || hasClientError || hasFilesError) return true;
    return false;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!viewState.isPreviewPage) {
      showFormErrors();
      if (!checkFormErrors()) {
        viewDispatch({ type: 'set_review_items' });
      }
      return;
    }

    const items = await getCarouselFiles();

    const formData = new FormData();

    formData.append('Titulo', formState.form.name);
    formData.append('IdCliente', formState.form.client.value);

    items.forEach(({ files }) => {
      files.forEach(({ file }, index) => {
        formData.append(`file_${index}`, file);
      });
    });

    try {
      const { data } = await JobsAPI.saveJob(formData);

      await JobsAPI.addProgress({
        idProjeto: data.id,
        situacao: 'Enviado',
      });
      // situacao: id ? 'Re-enviado' : 'Enviado',
      // addToast(`Job ${id ? 'editado' : 'cadastrado'} com sucesso!`, {

      addToast(`Job ${'cadastrado'} com sucesso!`, {
        appearance: 'success',
      });
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
    }
  };

  return (
    <>
      <Container className="pb-5 mb-5">
        <Form onSubmit={submitForm}>
          <Row className="pb-5">
            <Col md={5}>
              <JobFormFields />
            </Col>
            <Col md={7} lg={{ offset: 1, span: 5 }}>
              <JobFormFiles />
            </Col>
          </Row>
          <JobFormFooter />
        </Form>
      </Container>
      <UploadFilesModal />
    </>
  );
};

export default JobForm;
