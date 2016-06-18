require('../../test_helper');

describe('GithubHelper', function() {
  let fetchHelper = require('../../../app/helpers/fetch_helper');
  let GithubHelper = require('../../../app/helpers/github_helper');

  describe('#fetch', function() {
    let path = '/some_path';
    it('fetches from to the Github API at the specified path', function() {
      var fetchSpy = sinon.spy(fetchHelper, 'fetchJson');
      GithubHelper.fetch(path);
      expect(fetchSpy).to.have.been.calledOnce;
    });
  });
});
