import axios from "axios";

/**
 * Simple post request utility function
 * @param {string} route
 * @param {object} body
 * @param {object} headers
 */
export const postRequest = async (route, body = {}, headers = {}) => {
  try {
    const response = await axios.post(route, body, { headers });
    if (response.status === 200) return response;
    throw new Error(`Error when trying to fetch ${route}`);
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }
};

/**
 * Simple authenticated request utility function (gets authToken from localStorage)
 * @param {string} route
 * @param {string} body
 */
export const authPostRequest = async (route, body) => {
  const authToken = window.localStorage.getItem("auth_token");
  return postRequest(route, body, { Authorization: `Bearer ${authToken}` });
};
