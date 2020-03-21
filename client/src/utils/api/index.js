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
 * Simple get request utility function
 * @param {string} route
 * @param {object} params
 * @param {object} headers
 */
export const getRequest = async (route, params = {}, headers = {}) => {
  try {
    const paramsArray = Object.keys(params).map(
      name => `${name}=${params[name]}`
    );
    if (paramsArray && paramsArray.length) route += `?${paramsArray.join("&")}`;
    const response = await axios.get(route, { headers });
    if (response.status === 200) return response;
    throw new Error(`Error when trying to fetch ${route}`);
  } catch (err) {
    return {
      error: true,
      message: err
    };
  }
};
