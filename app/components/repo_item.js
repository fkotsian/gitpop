const React = require('react');
const {Thumbnail} = require('react-bootstrap');

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
      <li className="repo-item">
        <Thumbnail src="https://avatars.githubusercontent.com/u/69631?v=3" alt={name} >
          <div className="repo-name">
            <h4>
              <a href={'https://github.com/' + name + '/' + name}>{name}</a>
            </h4>
            <p className="repo-stars">
              <span className="glyphicon glyphicon-star" /> {stars}
            </p>
          </div>
          <span className="repo-top-contributor">
            <p><span className="glyphicon glyphicon-user" />  {topContributor}</p>
          </span>
        </Thumbnail>
      </li>
    );
  };
};

RepoItem.propTypes = propTypes;

module.exports = RepoItem;
