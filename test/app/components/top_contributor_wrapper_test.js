require('../../test_helper');

const TopContributorWrapper = require('../../../app/components/top_contributor_wrapper.js');
const GithubClient = require('../../../app/helpers/github_client');

describe('<TopContributorWrapper />', function() {
  describe('on component mount', function() {
    const contributorsUrl = 'https://api.github.com/repos/FreeCodeCamp/FreeCodeCamp/contributors?page=1&per_page=1';
    const topContributorData = {
      topContributor: 'QuincyLarson',
      topContributorUrl: 'https://github.com/QuincyLarson'
    };
    const topContributorDataPromise = Promise.resolve(topContributorData);
    let fetchContributorsSpy;

    beforeEach(function() {
      fetchContributorsSpy = sinon.stub(GithubClient, 'topContributorForRepo');
      fetchContributorsSpy.withArgs(contributorsUrl).returns(topContributorDataPromise);
    });

    afterEach(function() {
      GithubClient.topContributorForRepo.restore();
    });

    it('fetches the repo contributor data', function() {
      mount(<TopContributorWrapper contributorsUrl={contributorsUrl} />)

      expect(fetchContributorsSpy).to.have.been.called;
      expect(fetchContributorsSpy).to.have.been.calledWith(contributorsUrl);
    });
  });
});
