import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status) {
      /** @TODO Redirect user to login and remove session */
    }
    return Promise.reject(error);
  }
);

export function authHeader() {
  let token = localStorage.getItem('aprovaai_user_token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
}

export async function getRequest(path, params = {}) {
  return await axios.get(`${API_URL}/${path}`, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...authHeader()
    }
  });
}

export async function postRequest(
  path,
  data,
  contentType = 'multipart/form-data'
) {
  return await axios.post(`${API_URL}/${path}`, data, {
    headers: {
      'Content-Type': contentType,
      ...authHeader()
    }
  });
}

export async function putRequest(
  path,
  data = {},
  contentType = 'application/json'
) {
  return await axios.put(`${API_URL}/${path}`, data, {
    headers: {
      'Content-Type': contentType,
      ...authHeader()
    }
  });
}

export async function deleteRequest(
  path,
  data = {},
  contentType = 'application/json'
) {
  return await axios.delete(`${API_URL}/${path}`, {
    headers: {
      'Content-Type': contentType,
      ...authHeader()
    }
  });
}
