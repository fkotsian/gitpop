const React = require('react');
const TopContributor = require('./top_contributor');
const GithubClient = require('../helpers/github_client');

const propTypes = {
  contributorsUrl: React.PropTypes.string.isRequired
};

class TopContributorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Waiting to fetch top contributor...',
      url: '#'
    };
  }

  componentDidMount() {
    GithubClient.topContributorForRepo(this.props.contributorsUrl).then(
      ({topContributor, topContributorUrl}) => {
        this.state.name = topContributor || this.state.name;
        this.state.url = topContributorUrl || this.state.url;
        this.setState(this.state);
      }
    );
  };

  render() {
    return (
      <TopContributor name={this.state.name} url={this.state.url} />
    );
  };
};

TopContributorWrapper.propTypes = propTypes;

module.exports = TopContributorWrapper;
