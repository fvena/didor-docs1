import axios from 'axios';

const ApiService = {
  /**
   * Initialice the Api Service
   *
   * @param {String} baseURL - Base url of the API
   */
  init(baseURL) {
    // Configuration
    axios.defaults.baseURL = baseURL;
  },

  get(resource) {
    return axios.get(resource);
  },
};

export default ApiService;
