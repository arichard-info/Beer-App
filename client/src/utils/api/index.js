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
      message: err,
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
      (name) => `${name}=${params[name]}`
    );
    if (paramsArray && paramsArray.length) route += `?${paramsArray.join("&")}`;
    const response = await axios.get(route, { headers });
    if (response.status === 200) return response;
    throw new Error(`Error when trying to fetch ${route}`);
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const fetchAjax = (ajaxPath, fetchOptions = {}, ajaxOption = {}) => {
  if (typeof fetch === "function")
    return fetch(ajaxPath, fetchOptions).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return ajaxOption.responseType && response[ajaxOption.responseType]
        ? response[ajaxOption.responseType]()
        : response.json();
    });

  console.warn(
    `fetchAjax called with ${URL} : Wrong usage, this is not intended to be called on server-side.`
  );
  return Promise.reject(new Error());
};

export const jsonToQueryString = (json) => {
  return Object.keys(json)
    .map((key) => {
      return (
        typeof json[key] !== "undefined" &&
        encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
      );
    })
    .filter(Boolean)
    .join("&");
};
