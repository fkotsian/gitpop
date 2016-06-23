const fetchHelper = require('./fetch_helper');

const BASE_URL = 'https://api.github.com';
const BASE_ERR_MESSAGE = 'Error fetching from Github API: ';

function onApiError(err) {
  let apiErr = new Error(`${BASE_ERR_MESSAGE}${err.message}`);
  apiErr.status = err.response.status;
  throw apiErr;
}

const GithubHelper = {
  fetch: function(path, options = {}) {
           return fetchHelper.fetchJson(`${BASE_URL}${path}`, options)
             .catch(onApiError)
         }
};

module.exports = GithubHelper;
