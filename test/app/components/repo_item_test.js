require('../../test_helper');

const RepoItem = require('../../../app/components/repo_item');
const GithubHelper = require('../../../app/helpers/github_helper');

describe('<RepoItem />', function() {
  const contributorsUrl = 'https://api.github.com/repos/FreeCodeCamp/FreeCodeCamp/contributors?page=1&per_page=1';
  const contributorsUrlPath = '/repos/FreeCodeCamp/FreeCodeCamp/contributors?page=1&per_page=1';
  let fetchContributorsSpy;
  let wrapper;

  describe('required fields', function() {
    beforeEach(function() {
      wrapper = shallow(<RepoItem name={'item-1'} stars={5} contributorsUrl={contributorsUrl} />);
    });
   
    it('displays the name of the repo', function() {
      expect(wrapper.find('.repo-name')).to.have.length(1);
    });

    it('displays an icon with the number of stars the repo has', function() {
      expect(wrapper.find('.repo-stars')).to.have.length(1);
      expect(wrapper.find('.glyphicon-star')).to.have.length(1);
    });

    it('displays the top contributor to the repo', function() {
      expect(wrapper.find('.repo-top-contributor')).to.have.length(1);
    });
  });

  describe('on component mount', function() {
    const rawContributorsData = require('../../fixtures/top_contributor_free_code_camp');
    const rawContributorsDataPromise = Promise.resolve(rawContributorsData);

    beforeEach(function() {
      fetchContributorsSpy = sinon.stub(GithubHelper, 'fetch');
      fetchContributorsSpy.withArgs(contributorsUrlPath).returns(
        rawContributorsDataPromise
      );
    });

    afterEach(function() {
      GithubHelper.fetch.restore();
    });

    it('fetches the repo contributor data', function() {
      mount(<RepoItem name={'item-1'} stars={5} contributorsUrl={contributorsUrl} />);

      expect(fetchContributorsSpy).to.have.been.called;
      expect(fetchContributorsSpy).to.have.been.calledWith(contributorsUrlPath);
    });

    it('rerenders the component and displays the top contributor', function() {
      let renderSpy = sinon.spy(RepoItem.prototype, 'componentDidMount');
      let topContributor = wrapper.find('.repo-top-contributor-link').text();

      Promise.resolve(
        mount(<RepoItem name={'item-1'} stars={5} contributorsUrl={contributorsUrl} />)
      ).then(() => {
        expect(renderSpy).to.have.been.calledOnce;
        expect(topContributor).to.equal('QuincyLarson');
      });
    });
  });
});
