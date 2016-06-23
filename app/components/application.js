const React = require('react');
const RepoList = require('./repo_list');
const GithubClient = require('../helpers/github_client');
const {Navbar, Nav, NavItem} = require('react-bootstrap');

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
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">GitPop</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem>The Top 100 Repos on GitHub</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div id="app-container">
          <RepoList repoItems={this.state.repoItems} />
        </div>
      </div>
    );
  };
};

module.exports = Application;
