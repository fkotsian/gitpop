const GithubHelper = require('./github_helper');
const GithubParser = require('./github_parser');
const GithubComposer = require('./github_composer');

const TOP_HUNDRED_REPOS_PATH = '/search/repositories?q=stars\:\>1\&s=stars\&page=1&per_page=100';

const GithubClient = {
  topHundredRepos: function() {
                     const repoItemsPromise = GithubHelper.fetch(TOP_HUNDRED_REPOS_PATH)
                       .then((repoData) => GithubParser.repoItems(repoData) )
                       .then((rawRepoItems) => {
                         return rawRepoItems.map(
                           (rawRepoItem) => GithubComposer.composeRepo(rawRepoItem)
                         )
                       });

                     return repoItemsPromise;
                   }
};

module.exports = GithubClient;
