import axios from "axios";

export const postRequest = async (route, body = {}, headers = {}) => {
  const response = await axios.post(route, body, { headers });
  if (response.status === 200) return response;
  return false;
};

export const authPostRequest = async (route, body) => {
  const authToken = window.localStorage.getItem("auth_token");
  return postRequest(route, body, { Authorization: `Bearer ${authToken}` });
};

export const login = async (email, password) => {
  const {
    data: { user }
  } = await postRequest(`/api/login`, { email, password });
  return user || false;
};

export const forgot = async email => {
  const response = await postRequest(`/api/account/forgot`, { email });
  return !!response;
};

export const resetPassword = async (
  token = false,
  { password, passwordConfirm }
) => {
  if (!token || !password || !passwordConfirm) return false;
  const {
    data: { user }
  } = await postRequest(`/api/account/reset/${token}`, {
    password,
    "password-confirm": passwordConfirm
  });
  return user || false;
};

export const signup = async ({ name, email, password, confirmPassword }) => {
  if (!name || !email || !password || !confirmPassword) return;
  const {
    data: { user }
  } = await postRequest(`/api/register`, {
    name,
    email,
    password,
    "confirm-password": confirmPassword
  });

  return user || false;
};

export const completeProfile = async userObject => {
  const { data: user } = authPostRequest(
    `/api/auth/complete-profile`,
    userObject
  );
  return user || false;
};
