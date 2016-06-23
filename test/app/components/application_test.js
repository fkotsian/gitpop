require('../../test_helper');
const Application = require('../../../app/components/application');
const GithubClient = require('../../../app/helpers/github_client');
const Repo = require('../../factories/repo');

describe('<Application />', function() {
  let hundredRepos;
  let hundredReposPromise;
  let topHundredReposSpy;

  beforeEach(function() {
    hundredRepos = Array(100).fill().map(() => Repo.build());
    hundredReposPromise = Promise.resolve(hundredRepos);
    topHundredReposSpy = sinon.stub(GithubClient, 'topHundredRepos')
      .returns(hundredReposPromise);
  });

  afterEach(function() {
    GithubClient.topHundredRepos.restore();
  });

  it('fetches the 100 most popular repos', function() {
    const app = shallow(<Application />);
    expect(topHundredReposSpy).to.have.been.called;
  });

  it('renders a RepoList with RepoItems', function() {
    const app = Promise.resolve(render(<Application />))
      .then(() => {
        expect(app.find('.repo-list')).to.have.length(1);
        expect(app.find('.repo-item')).to.have.length(100);
      });
  });
});
