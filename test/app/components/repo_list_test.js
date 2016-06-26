require('../../test_helper');
const RepoList = require('../../../app/components/repo_list');

describe('<RepoList />', function() {
  let repoItemData = [
    { name: 'repo-1', stars: 5, contributorsUrl: 'https://api.github.com/repos/owner/repo-1/contributors' },
    { name: 'repo-2', stars: 50, contributorsUrl: 'https://api.github.com/repos/owner/repo-2/contributors' },
    { name: 'repo-3', stars: 500, contributorsUrl: 'https://api.github.com/repos/owner/repo-3/contributors' },
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
