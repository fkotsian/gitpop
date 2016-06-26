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

      it('returns an object containing the name, stars, and contributors URL for the repo, as well as some supplementary properties', function() {
        const repoObj = GithubComposer.composeRepo(singleRepoData);

        return expect(repoObj).to.deep.equal({
          name: 'FreeCodeCamp',
          stars: 144601,
          description: "The https://FreeCodeCamp.com open source codebase and curriculum. Learn to code and help nonprofits.",
          avatarUrl: "https://avatars.githubusercontent.com/u/9892522?v=3",
          htmlUrl: "https://github.com/FreeCodeCamp/FreeCodeCamp",
          contributorsUrl: "https://api.github.com/repos/FreeCodeCamp/FreeCodeCamp/contributors",
        });
      });
    });
  });
});
