require('../../test_helper');

const TopContributor = require('../../../app/components/top_contributor.js');

describe('<TopContributor />', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<TopContributor name="top-contributor" url="https://github.com/TopContributor" />);
  });

  it('displays the top contributor to the repo', function() {
    expect(wrapper.find('.repo-top-contributor').text()).to.equal('top-contributor');
  });

  it("links to the top contributor's page on Github", function() {
    expect(wrapper.find('.repo-top-contributor-link').props().href).to.equal('https://github.com/TopContributor');
  });
});
