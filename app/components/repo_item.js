const React = require('react');
const {Thumbnail} = require('react-bootstrap');
const TopContributorWrapper = require('./top_contributor_wrapper');

const propTypes = {
  name: React.PropTypes.string.isRequired,
  stars: React.PropTypes.number.isRequired,
  contributorsUrl: React.PropTypes.string.isRequired
};

class RepoItem extends React.Component {
  constructor(props) {
    super(props);
  }

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
            <TopContributorWrapper contributorsUrl={contributorsUrl} />
          </div>
        </Thumbnail>
      </li>
    );
  };
};

RepoItem.propTypes = propTypes;

module.exports = RepoItem;
