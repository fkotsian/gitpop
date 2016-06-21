require('../../test_helper');

const RepoItem = require('../../../app/components/repo_item');

describe('<RepoItem />', function() {
  let wrapper;
 
  beforeEach(function() {
    wrapper = shallow(<RepoItem name={'item-1'} stars={5} topContributor={'contributor'} />);
  });

  it('displays the name of the repo', function() {
    expect(wrapper.find('.repo-name')).to.have.length(1);
  });

  it('displays an icon with the number of stars the repo has', function() {
    expect(wrapper.find('.repo-stars')).to.have.length(1);
    expect(wrapper.find('.repo-stars-icon')).to.have.length(1);
  });

  it('displays the top contributor to the repo', function() {
    expect(wrapper.find('.repo-top-contributor')).to.have.length(1);
  });
});
