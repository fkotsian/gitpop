require('../../test_helper');

const GithubClient = require('../../../app/helpers/github_client');
const GithubHelper = require('../../../app/helpers/github_helper');
const GithubParser = require('../../../app/helpers/github_parser');
const GithubComposer = require('../../../app/helpers/github_composer');

describe('GithubClient', function() {
  describe('fetching the top 100 repos and their top contributor', function() {
    const topHundredReposPath = '/search/repositories?q=stars\:\>1\&s=stars\&page=1&per_page=100';
    const rawRepoData = require('../../fixtures/raw_repo_length_hundred');
    const rawRepoDataPromise = Promise.resolve(rawRepoData);

    let fetchRawDataSpy;
    let parseSpy;
    let composeSpy;

    beforeEach(function() {
      fetchRawDataSpy = sinon.stub(GithubHelper, 'fetch')
        .withArgs(topHundredReposPath)
        .returns(rawRepoDataPromise);
      parseSpy = sinon.spy(GithubParser, 'repoItems');
      composeSpy = sinon.spy(GithubComposer, 'composeRepo')
    });

    afterEach(function() {
      GithubHelper.fetch.restore();
      GithubParser.repoItems.restore();
      GithubComposer.composeRepo.restore();
    });

    it('queries the Github API for the top 100 repos', function() {
      GithubClient.topHundredRepos().then(
        () => expect(fetchRawDataSpy).to.have.been.called
      );
    });

    it('parses the raw response data', function() {
      GithubClient.topHundredRepos().then(
        () => expect(parseSpy).to.have.been.called
      );
    });

    it('composes the list of repo objects', function() {
      GithubClient.topHundredRepos().then(
        () => expect(composeSpy.callCount).to.equal(100)
      );
    });

    it('returns an array of length 100 of parsed repo objects containing the desired fields', function() {
      GithubClient.topHundredRepos().then(
        (repoItems) => {
          expect(repoItems.constructor).to.equal(Array);
          expect(repoItems).to.have.length(100);

          const repoItem = repoItems[0];
          expect(repoItem).to.have.property('name');
          expect(repoItem).to.have.property('stars');
          expect(repoItem).to.have.property('contributorsUrl');
        }
      );
    });
  });

  describe('fetching the top contributor for a repo', function() {
    const contributorsUrl = 'https://api.github.com/repos/FreeCodeCamp/FreeCodeCamp/contributors';
    const contributorsPathQuery = '/repos/FreeCodeCamp/FreeCodeCamp/contributors?page=1&per_page=1';
    const contributorsData = require('../../fixtures/top_contributor_free_code_camp.js');
    const contributorsDataPromise = Promise.resolve(contributorsData);

    let fetchTopContributorSpy;

    beforeEach(function() {
      fetchTopContributorSpy = sinon.stub(GithubHelper, 'fetch')
        .withArgs(contributorsPathQuery)
        .returns(contributorsDataPromise);
    });

    afterEach(function() {
      GithubHelper.fetch.restore();
    });

    it('queries the Github API', function() {
      GithubClient.topContributorForRepo(contributorsUrl).then(
        (_) => expect(fetchTopContributorSpy).to.have.been.called
      );
    });

    it('returns an object containing the top contributor and her profile URL', function() {
      GithubClient.topContributorForRepo(contributorsUrl).then(
        (contributorData) => expect(contributorData).to.equal({
          "topContributor": "QuincyLarson",
          "topContributorUrl": "https://github.com/QuincyLarson"
        })
      );
    });
  });
});
