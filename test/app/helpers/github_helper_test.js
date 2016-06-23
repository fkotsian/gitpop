require('../../test_helper');
require('../../support/mock_responses');

describe('GithubHelper', function() {
  let fetchHelper = require('../../../app/helpers/fetch_helper');
  let GithubHelper = require('../../../app/helpers/github_helper');

  describe('#fetch', function() {
    let path = '/some_path';

    it('fetches from the Github API at the specified path', function() {
      let fetchSpy = sinon.spy(fetchHelper, 'fetchJson');
      GithubHelper.fetch(path);

      expect(fetchSpy).to.have.been.calledOnce;
      expect(fetchSpy).to.have.been.calledWith('https://api.github.com/some_path');
    });
  });

  describe('fetching from the Github API', function() {
    describe('when the path does not exist at the Github API', function() {
      let nonexistentPath = '/nonexistent_path';

      beforeEach(function() {
        fetchMock.mock('https://api.github.com/nonexistent_path', mockFailure);
      });

      it('raises an informative error', function() {
        let err = GithubHelper.fetch(nonexistentPath).catch(
          (err) => {
            expect(err.message).to.match(/Error fetching from Github API:/);
            expect(err.status).to.equal(404);
          }
        );
      });
    });
    
    describe('when the path does exist at the Github API', function() {
      let realEndpoint = '/real_endpoint';
      
      beforeEach(function() {
        fetchMock.mock('https://api.github.com/real_endpoint', mockSuccess);
      });

      it('returns the desired object as JSON', function() {
        let json = GithubHelper.fetch(realEndpoint);

        return expect(json).to.eventually.become(mockSuccess.body);
      });
    });
  });
});
