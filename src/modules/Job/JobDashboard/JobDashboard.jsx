import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import JobDashboardFooter from './JobDashboardFooter';
import JobDashboardHeader from './JobDashboardHeader';
import JobDashboardChangesForm from './JobDashboardChangesForm';
import Timeline from '../../../components/Timeline';
import JobChangesRequestedModal from '../../../components/modals/JobChangesRequestedModal';
import JobDashboardImageHandler from './JobDashboardImageHandler';
import JobDashboardEditModalComponent from './JobDashboardEditModal';
import JobDashboardRemoveItemModal from './JobDashboardRemoveItemModal';

const JobDashboard = ({
  index,
  fileIndex,
  job,
  client,
  requestChanges,
  handleRequestChanges,
  timeline,
  setIndex,
  setFileIndex,
  setRequestChanges,
  approveJob,
  saving,
  user,
  showChangesModal,
  handleCloseChangesModal,
  openEditModal,
  showEditModal,
  handleCloseEditModal,
  showBigPicture,
  handleCloseBigPicture,
  handleOpenBigPicture,
  progressItems,
  onRemoveItem,
  handleConfirmRemoveItem,
  showRemoveItemModal,
  handleCloseRemoveItemModal,
  handleAttachNew,
  handleRemoveFile,
}) => (
  <main className="mt-5 pb-5" style={{ marginBottom: 180 }}>
    <Container>
      <Row>
        <Col md={4}>
          <div>
            <JobDashboardImageHandler
              setFileIndex={setFileIndex}
              fileIndex={fileIndex}
              files={job.detalhes[index].arquivos}
              description={
                job.detalhes[index].collectionDescription ??
                'afsdasdfadsfafsdasdfadsfafsdasdfadsfafsdasdfadsfafsdasdfadsf'
              }
              showBigPicture={showBigPicture}
              handleCloseBigPicture={handleCloseBigPicture}
              handleOpenBigPicture={handleOpenBigPicture}
            />
          </div>
          <div className="bg-white rounded shadow p-3 text-break">
            <strong>Descrição</strong>
            <p>
              {job.detalhes[index].collectionDescription ??
                'afsdasdfadsfafsdasdfadsfafsdasdfadsfafsdasdfadsfafsdasdfadsf'}
            </p>
          </div>
        </Col>
        <Col md={{ span: 6, offset: 2 }}>
          <Row>
            <Col xs={12} md={10}>
              <JobDashboardHeader
                job={job}
                index={index}
                avatar={client.enderecoLogo}
                item={job.detalhes[index]}
                onRemoveItem={onRemoveItem}
              />

              {requestChanges ? (
                <JobDashboardChangesForm
                  handleRequestChanges={handleRequestChanges}
                  setRequestChanges={setRequestChanges}
                  saving={saving}
                />
              ) : (
                <>
                  {timeline.length > 0 ? (
                    <Timeline>
                      {timeline.map((timeline) => (
                        <Timeline.Item {...timeline} />
                      ))}
                    </Timeline>
                  ) : null}
                </>
              )}
              {job.detalhes[index].arquivos[0].situacao !== 'Ajuste' ? (
                <Button
                  style={{
                    backgroundColor: '#FF9A23',
                    border: 'none',
                    color: 'black',
                  }}
                  className="w-100 p-3"
                  onClick={() => openEditModal()}
                >
                  Ajustar item
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    <JobDashboardFooter
      job={job}
      setIndex={setIndex}
      user={user}
      index={index}
      setRequestChanges={setRequestChanges}
      requestChanges={requestChanges}
      approveJob={approveJob}
      saving={saving}
      progressItems={progressItems}
    />

    <JobChangesRequestedModal
      show={showChangesModal}
      onHide={handleCloseChangesModal}
    />

    <JobDashboardEditModalComponent
      show={showEditModal}
      onHide={handleCloseEditModal}
      item={job.detalhes[index]}
      handleAttachNew={handleAttachNew}
      handleRemoveFile={handleRemoveFile}
    />

    <JobDashboardRemoveItemModal
      handleConfirmRemoveItem={handleConfirmRemoveItem}
      showRemoveItemModal={showRemoveItemModal}
      handleCloseRemoveItemModal={handleCloseRemoveItemModal}
    />
  </main>
);

export default JobDashboard;
