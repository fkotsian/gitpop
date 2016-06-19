const fetchMock = require('fetch-mock');

const mockSuccess = {
  body: {
    'desired': 'object',
  },
  status: 200,
  headers: {
    'Content-type': 'application/json'
  }
};

const mockFailure = {
  body: 'Could not find path',
  status: 404,
  headers: {
    'Content-type': 'application/json'
  }
};

afterEach(function() {
  fetchMock.restore();
});

Object.assign(global, {fetchMock, mockSuccess, mockFailure});
