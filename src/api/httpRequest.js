import axios from "axios";

const httpRequest = async (method, url, request) => {
  try {
    await axios({
      method: method,
      headers: { "Access-Control-Allow-Origin": "*" },
      url: url,
      data: request,
    }).then((response) => {
      return Promise.resolve(response);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  get(url, request) {
    return httpRequest("GET", url, request);
  },

  delete(url, request) {
    return httpRequest("DELETE", url, request);
  },

  post(url, request) {
    return httpRequest("POST", url, request);
  },

  put(url, request) {
    return httpRequest("PUT", url, request);
  },
};
