import { getRequest, putRequest } from './utils';

const path = 'Notificacao';

export async function getNotifications(perPage = 10, page = 0, isRead = null) {
  return await getRequest(path, { qtdRegistro: perPage, page, isRead });
}

export async function markAsRead(id) {
  return await putRequest(`${path}/?id=${id}`, {}, 'application/json');
}
