import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import JobDashboardFooter from './JobDashboardFooter';
import JobDashboardHeader from './JobDashboardHeader';
import JobDashboardChangesForm from './JobDashboardChangesForm';
import Timeline from '../../../components/Timeline';
import Avatar from '../../../components/Avatar';
import JobChangesRequestedModal from '../../../components/modals/JobChangesRequestedModal';
import JobDashboardImageHandler from './JobDashboardImageHandler';

const JobDashboard = ({
  index,
  fileIndex,
  job,
  client,
  isPackage,
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
  progressItems,
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
            <Col xs={12} md={2}>
              <Avatar src={client.enderecoLogo} size={56} />
            </Col>
            <Col xs={12} md={10}>
              <JobDashboardHeader job={job} index={index} />

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
  </main>
);

export default JobDashboard;
