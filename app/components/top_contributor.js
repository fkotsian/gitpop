const React = require('react');

const propTypes = {
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
};

class TopContributor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, url} = this.props;
    
    return (
      <span className="repo-top-contributor-container">
        <p><span className="glyphicon glyphicon-user" />
          <span>  </span>
          <a className="repo-top-contributor-link" href={url}>
            <span className="repo-top-contributor">{name}</span>
          </a>
        </p>
      </span>
    );
  };
};

TopContributor.propTypes = propTypes;

module.exports = TopContributor;
