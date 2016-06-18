const fetchHelper = require('./fetch_helper');
const BASE_URL = 'https://api.github.com';

const GithubHelper = {
  fetch: function(path, options = {}) {
           fetchHelper.fetchJson(`${BASE_URL}${path}`, options);
         }
};

module.exports = GithubHelper;
