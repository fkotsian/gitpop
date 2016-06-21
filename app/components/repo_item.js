const React = require('react');

const propTypes = {
  name: React.PropTypes.string.isRequired,
  stars: React.PropTypes.number.isRequired,
  topContributor: React.PropTypes.string.isRequired
};

class RepoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, stars, topContributor} = this.props;

    return (
      <div className="repo-item">
        <div className="repo-name">{name}</div>
        <div className="repo-stars"><span className='repo-stars-icon' />{stars}</div>
        <div className="repo-top-contributor">{topContributor}</div>
      </div>
    );
  };
};

RepoItem.propTypes = propTypes;

module.exports = RepoItem;
