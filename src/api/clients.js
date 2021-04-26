import { getRequest, postRequest } from './utils';

const path = 'Cliente';

export async function getClients(perPage = 10, page = 0, name) {
  const query = {
    qtdRegistro: perPage,
    page,
  };
  if (name) {
    query.nome = name;
  }
  return await getRequest(path, query);
}

export async function getClient(id) {
  return await getRequest(`${path}/GetCliente?id=${id}`);
}

export async function createClient(data) {
  return await postRequest(path, data);
}

export async function saveApprover(data) {
  return await postRequest(`${path}/addaprovador`, data, 'application/json');
}

export async function removeApprover(email) {
  return await postRequest(
    `${path}/removeaprovador`,
    { email },
    'application/json'
  );
}

export async function deleteClient(clientId) {
  return await postRequest(`${path}/removecliente/${clientId}`);
}
