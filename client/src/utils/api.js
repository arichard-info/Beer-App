import axios from "axios";

export const postRequest = async (route, body = {}, headers = {}) => {
  const response = await axios.post(route, body, { headers });
  if (response.status === 200 && response.data) return response.data;
  return false;
};

export const login = async (email, password) => {
  const { user } = await postRequest(`/api/login`, { email, password });
  return user || false;
};

export const forgotPassword = async email => {};
