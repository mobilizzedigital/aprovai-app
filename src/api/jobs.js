import { getRequest, postRequest, deleteRequest } from './utils';

const path = 'Projeto';

export async function getJobs(perPage = 10, page = 0, title) {
  const query = {
    qtdRegistro: perPage,
    page
  };
  if (title) {
    query.titulo = title;
  }
  return getRequest(path, query);
}

export async function getJobsByClient(clientId) {
  return getRequest(path, {
    idCliente: clientId
  });
}

export async function getPendingJobs(perPage = 10) {
  return getRequest(`${path}/getProjetosPendentes`, { qtdRegistro: perPage });
}

export async function getJob(id) {
  return getRequest(`${path}/getprojeto/${id}`);
}

export async function getApprovals() {
  return getRequest(`${path}/getaprovacoes`);
}

export async function getProgress(id) {
  return getRequest(`${path}/getandamento/${id}`);
}

export async function saveJob(data) {
  return await postRequest(path, data);
}

export async function approveJob(id) {
  return await getRequest(`${path}/aprovarprojeto/${id}`);
}

export async function approveJobFile(jobId, fileId) {
  return await getRequest(`${path}/aprovararquivo/${jobId}/${fileId}`);
}

export async function addProgress(data) {
  return await postRequest(`${path}/addAndamento`, data, 'application/json');
}

export async function deleteFile(fileId) {
  return await deleteRequest(`${path}/DeleteArquivo/${fileId}`);
}
