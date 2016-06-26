const React = require('react');
const RepoItem = require('./repo_item');

const propTypes = {
  repoItems: React.PropTypes.array.isRequired
};

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {repoItems} = this.props;
    const repoItemsList = repoItems.map(
        ({name, stars, description, avatarUrl, htmlUrl, contributorsUrl}) => {
          return (<RepoItem key={name}
                            name={name}
                            stars={stars}
                            description={description}
                            avatarUrl={avatarUrl}
                            htmlUrl={htmlUrl}
                            contributorsUrl={contributorsUrl} />);
        }
    );

    return (
      <ul className="repo-list">
        {repoItemsList}
      </ul>
    );
  };
};

RepoList.propTypes = propTypes;

module.exports = RepoList;
