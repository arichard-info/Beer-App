import { postRequest, authPostRequest } from "./index";

/**
 * log user in with email and password
 * @param {string} email
 * @param {string} password
 */
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

/**
 * forgot email call (will send reset email to user)
 * @param {string} email
 */
export const forgot = async email => {
  const response = await postRequest(`/api/account/forgot`, { email });
  return response;
};

/**
 * reset password call
 * @param {string} token
 * @param {object} param1 password and confirm password strings
 */
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

/**
 * signup call
 * @param {object} param0 User signup fields
 */
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

/**
 * profile complete call (after first auth with provider)
 * @param {object} userObject completed user object
 */
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
