import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import JobCard from '../../../components/JobCard';
import BottomBar from '../../../components/BottomBar';
import LoadingSpinnerButton from '../../../components/LoadingSpinnerButton';

const JobReview = ({
  isEdit,
  job,
  saving,
  onRemoveItem,
  onCancel,
  onConfirm
}) => (
  <>
    <Container className="mb-5">
      <Row className="pb-5">
        {job.urlArquivo
          ? job.urlArquivo.map((item, index) => (
              <Col sm={6} lg={3} key={`file_${item.id}`} className="p-3">
                <JobCard
                  id={job.id}
                  index={index}
                  image={item.endereco}
                  name={job.titulo}
                  status={job.situacao}
                  onRemove={onRemoveItem}
                />
              </Col>
            ))
          : null}
      </Row>
    </Container>

    {!isEdit && (
      <BottomBar>
        <div />
        <div>
          <Button variant="light" size="lg" onClick={onCancel}>
            Voltar
          </Button>
          <LoadingSpinnerButton
            type="button"
            className="ml-md-5"
            onClick={onConfirm}
            loading={saving}
          >
            Enviar para o cliente
          </LoadingSpinnerButton>
        </div>
      </BottomBar>
    )}
  </>
);

export default JobReview;
