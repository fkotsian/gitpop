require('../../test_helper');

const TopContributor = require('../../../app/components/top_contributor.js');

describe('<TopContributor />', function() {
  let wrapper;

  describe('required fields', function() {
    beforeEach(function() {
      wrapper = shallow(<TopContributor name="top-contributor" url="https://github.com/TopContributor" />);
    });

    it('displays the top contributor to the repo', function() {
      const topContributor = wrapper.find('.repo-top-contributor-link').text();
      expect(topContributor).to.equal('top-contributor');
    });

    it("links to the top contributor's page on Github", function() {
      const topContributorUrl = wrapper.find('.repo-top-contributor-link').props().href;
      expect(topContributorUrl).to.equal('https://github.com/TopContributor');
    });
  });
});
