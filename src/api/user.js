import { getRequest, postRequest } from './utils';

const path = 'User';

export async function getUser() {
  return await getRequest(path);
}

export async function getUsersTeam() {
  return await getRequest(`${path}/GetEquipe`);
}

export async function saveUser(data) {
  return await postRequest(path, data);
}

export async function deleteUser(email) {
  return await postRequest(`${path}/remove`, { email }, 'application/json');
}

export async function updatePassword(data) {
  return await postRequest(`${path}/changepassword`, data, 'application/json');
}

export async function login(data) {
  return await postRequest('Login', data, 'application/json');
}

export async function tokenLogin(token) {
  return await getRequest(`Login/loginToken/${token}`);
}

export async function logout() {
  return await getRequest('Login');
}

export async function addMember(data) {
  return await postRequest(`${path}/AddMember`, data, 'application/json');
}

export async function forgotPassword(email) {
  return await postRequest(
    `${path}/forgotpassword`,
    { email },
    'application/json'
  );
}
