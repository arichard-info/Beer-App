import axios from "axios";

export const postRequest = async (route, body = {}, headers = {}) => {
  try {
    const response = await axios.post(route, body, { headers });
    if (response.status === 200) return response;
    throw `Error when trying to fetch ${route}`;
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }
};

export const authPostRequest = async (route, body) => {
  const authToken = window.localStorage.getItem("auth_token");
  return postRequest(route, body, { Authorization: `Bearer ${authToken}` });
};

export const login = async (email, password) => {
  try {
    const {
      data: { user }
    } = await postRequest(`/api/login`, { email, password });
    if (!user) throw new Error("Error while trying to login");
    return user;
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }
};

export const forgot = async email => {
  const response = await postRequest(`/api/account/forgot`, { email });
  return response;
};

export const resetPassword = async (
  token = false,
  { password, passwordConfirm }
) => {
  try {
    if (!token || !password || !passwordConfirm)
      throw new Error("Missing token or wrong password confirm");
    const {
      data: { user }
    } = await postRequest(`/api/account/reset/${token}`, {
      password,
      "password-confirm": passwordConfirm
    });
    if (!user) throw new Error("Error while trying to reset password");
    return user;
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }
};

export const signup = async ({ name, email, password, passwordConfirm }) => {
  try {
    if (!name || !email || !password || !passwordConfirm)
      throw new Error("Invalid user informations");

    const {
      data: { user }
    } = await postRequest(`/api/register`, {
      name,
      email,
      password,
      "confirm-password": passwordConfirm
    });

    if (!user) throw new Error("Error while trying to signup");
    return user;
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }
};

export const completeProfile = async userObject => {
  try {
    const { data: user } = authPostRequest(
      `/api/auth/complete-profile`,
      userObject
    );
    if (!user) throw new Error("Error while trying to signup");
    return user;
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }
};
