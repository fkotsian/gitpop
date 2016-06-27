require('../../test_helper');

const RepoItem = require('../../../app/components/repo_item');

describe('<RepoItem />', function() {
  const contributorsUrl = 'https://api.github.com/repos/FreeCodeCamp/FreeCodeCamp/contributors?page=1&per_page=1';
  let wrapper;

  describe('required fields', function() {
    beforeEach(function() {
      wrapper = mount(<RepoItem name={'item-1'} stars={5} contributorsUrl={contributorsUrl} />);
    });
   
    it('displays the name of the repo', function() {
      expect(wrapper.find('.repo-name')).to.have.length(1);
    });

    it('displays an icon with the number of stars the repo has', function() {
      expect(wrapper.find('.repo-stars')).to.have.length(1);
      expect(wrapper.find('.glyphicon-star')).to.have.length(1);
    });

    it('renders the top contributor of the repo', function() {
      expect(wrapper.find('.repo-top-contributor')).to.have.length(1);
      expect(wrapper.find('.repo-top-contributor-link')).to.have.length(1);
    });
  });
});
