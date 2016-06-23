const React = require('react');
const RepoList = require('./repo_list');
const GithubClient = require('../helpers/github_client');

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repoItems: []
    };
  };

  fetchHundredRepos() {
    GithubClient.topHundredRepos()
      .then(
        (repoItemList) => {
          this.state.repoItems = repoItemList;
          this.setState(this.state);
        }
      );
  };

  componentWillMount() {
    this.fetchHundredRepos();
  };

  render() {
    return (
      <div>
        HELLO!
        <RepoList repoItems={this.state.repoItems} />
      </div>
    );
  };
};

module.exports = Application;
