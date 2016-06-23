require('../../test_helper');

const GithubComposer = require('../../../app/helpers/github_composer');
const GithubHelper = require('../../../app/helpers/github_helper');

describe('GithubComposer', function() {
  describe('creating objects from Github API data', function() {
    const singleRepoData = require('../../fixtures/raw_repo_length_one').items[0];

    describe('#composeRepo', function() {
      const contributorsUrlPath = '/repos/FreeCodeCamp/FreeCodeCamp/contributors?page=1&per_page=1'
      const rawContributorsData = require('../../fixtures/top_contributor_free_code_camp');
      const rawContributorsDataPromise = Promise.resolve(rawContributorsData);
      let fetchContributorsSpy;

      beforeEach(function() {
        fetchContributorsSpy = sinon.stub(GithubHelper, 'fetch');
        fetchContributorsSpy.withArgs(contributorsUrlPath).returns(
         rawContributorsDataPromise
        );
      });

      afterEach(function() {
        GithubHelper.fetch.restore();
      });

      it('fetches the top contributor', function() {
        GithubComposer.composeRepo(singleRepoData);
        expect(fetchContributorsSpy).to.have.been.calledWith(contributorsUrlPath);
      });

      it('returns an object containing the name, stars, and top contributor for the repo', function() {
        const repoObj = GithubComposer.composeRepo(singleRepoData);

        return expect(repoObj).to.eventually.become({
          name: 'FreeCodeCamp',
          stars: 144601,
          topContributor: 'QuincyLarson'
        });
      });
    });
  });
});
