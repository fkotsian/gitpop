require('../../test_helper');

const RepoItem = require('../../../app/components/repo_item');
const GithubClient = require('../../../app/helpers/github_client');

describe('<RepoItem />', function() {
  const contributorsUrl = 'https://api.github.com/repos/FreeCodeCamp/FreeCodeCamp/contributors?page=1&per_page=1';
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
    const topContributorData = {
      topContributor: 'QuincyLarson',
      topContributorUrl: 'https://github.com/QuincyLarson'
    };
    const topContributorDataPromise = Promise.resolve(topContributorData);
    let renderSpy;

    beforeEach(function() {
      fetchContributorsSpy = sinon.stub(GithubClient, 'topContributorForRepo');
      fetchContributorsSpy.withArgs(contributorsUrl).returns(topContributorDataPromise);
      renderSpy = sinon.spy(RepoItem.prototype, 'render');
    });

    afterEach(function() {
      GithubClient.topContributorForRepo.restore();
      RepoItem.prototype.render.restore();
    });

    it('fetches the repo contributor data', function() {
      mount(<RepoItem name={'item-1'} stars={5} contributorsUrl={contributorsUrl} />);

      expect(fetchContributorsSpy).to.have.been.called;
      expect(fetchContributorsSpy).to.have.been.calledWith(contributorsUrl);
    });

    it('rerenders the component and displays the top contributor', function() {
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
