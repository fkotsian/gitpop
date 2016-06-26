const React = require('react');
const {Thumbnail} = require('react-bootstrap');
const GithubHelper = require('../helpers/github_helper');

const propTypes = {
  name: React.PropTypes.string.isRequired,
  stars: React.PropTypes.number.isRequired,
};

function contributorsUrlPath(contributorsUrl) {
  return contributorsUrl.match(/(\/repos.*\/contributors)/)[1];
};

function onContributorFetchError(err) {
  console.warn(err);
  const unknownContributor = { login: 'Unable to fetch top contributor' };
  return [unknownContributor];
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
    const contributorsUrl = this.props.contributorsUrl;
    const contributorsPath = contributorsUrlPath(contributorsUrl);
    const contributorsPathQuery = `${contributorsPath}?page=1\&per_page=1`;

    GithubHelper.fetch(contributorsPathQuery)
      .catch(onContributorFetchError)
      .then((contributors) => {
        const topContributor = contributors[0];
        const topContributorName = topContributor.login;
        const topContributorUrl = topContributor.html_url;

        this.state.topContributor = topContributorName;
        this.state.topControbutorUrl = topContributorUrl;
        this.setState(this.state);
      });
  };

  render() {
    const {name, stars, description, avatarUrl, htmlUrl } = this.props;

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
            <span className="repo-top-contributor">
              <p><span className="glyphicon glyphicon-user" />
                <span>  </span>
                <a className="repo-top-contributor-link" href={this.state.topContributorUrl}>{this.state.topContributor}</a>
              </p>
            </span>
          </div>
        </Thumbnail>
      </li>
    );
  };
};

RepoItem.propTypes = propTypes;

module.exports = RepoItem;
