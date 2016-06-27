const React = require('react');
const {Thumbnail} = require('react-bootstrap');
const GithubClient = require('../helpers/github_client');
const TopContributor = require('./top_contributor');

const propTypes = {
  name: React.PropTypes.string.isRequired,
  stars: React.PropTypes.number.isRequired,
};

class RepoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topContributor: "Waiting to fetch top contributor...",
      topContributorUrl: "#"
    };
  }

  componentDidMount() {
    GithubClient.topContributorForRepo(this.props.contributorsUrl).then(
      ({topContributor, topContributorUrl}) => {
        this.state.topContributor = topContributor;
        this.state.topContributorUrl = topContributorUrl;
        this.setState(this.state);
      }
    );
  };

  render() {
    const {name, stars, description, avatarUrl, htmlUrl, contributorsUrl} = this.props;

    return (
      <li className="repo-item">
        <Thumbnail src={avatarUrl} alt={name}>
          <div>
            <h4 className="repo-name">
              <a className="repo-link" href={htmlUrl}>{name}</a>
            </h4>
            <p className="repo-description">{description}</p>
            <p className="repo-stars">
              <span className="glyphicon glyphicon-star" /> {stars}
            </p>
            <TopContributor name={this.state.topContributor} 
                            url={this.state.topContributorUrl} />
          </div>
        </Thumbnail>
      </li>
    );
  };
};

RepoItem.propTypes = propTypes;

module.exports = RepoItem;
