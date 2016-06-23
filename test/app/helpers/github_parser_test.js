require('../../test_helper');
const GithubParser = require('../../../app/helpers/github_parser');

describe('GithubParser', function() {
  describe('parsing items from a raw API response', function() {
    const rawRepoData = require('../../fixtures/raw_repo_length_hundred');

    describe('#repoItems', function() {
      it('expects JSON', function() {
        expect(() => GithubParser.repoItems([])).to.throw(/not valid JSON/);
      });

      it('returns the array of raw repo data from the "items" key', function() {
        var repoItems = GithubParser.repoItems(rawRepoData);
        expect(repoItems.constructor).to.equal(Array);
        expect(repoItems).to.have.length(100);
      });
    });
  });
});
