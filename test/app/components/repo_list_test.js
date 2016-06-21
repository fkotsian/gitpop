require('../../test_helper');
const RepoList = require('../../../app/components/repo_list');

describe('<RepoList />', function() {
  let repoItemData = [
    { name: 'repo-1', stars: 5, topContributor: 'contributor-A' },
    { name: 'repo-2', stars: 50, topContributor: 'contributor-B' },
    { name: 'repo-3', stars: 500, topContributor: 'contributor-C' },
  ];

  it('renders a list of Repos', function() {
    const repoList = shallow(<RepoList repoItems={repoItemData} />);
    expect(repoList.find('.repo-list')).to.have.length(1);
  });

  it('contains one RepoItem for every entry in RepoList', function() {
    const repoList = mount(<RepoList repoItems={repoItemData} />);
    expect(repoList.find('.repo-item')).to.have.length(3);
  });
});
