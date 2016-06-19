require('../test_helper');
require('../support/mock_responses');

describe('integrating with the Github API', function() {
  describe('happy path', function() {
    describe('when connected to the internet', function() {
      it('receives the expected data from Github', function() {
        let GithubHelper = require('../../app/helpers/github_helper');
        let expectedName = 'The Octocat';
        let expectedId = 583231;

        let responseJson = GithubHelper.fetch('/users/octocat');
        let actualName = responseJson.then(json => json['name']);
        let actualId = responseJson.then(json => json['id']);

        return Promise.all([
          expect(actualName).to.eventually.equal('The Octocat'),
          expect(actualId).to.eventually.equal(expectedId)
        ]);
      });
    });
  });
});
