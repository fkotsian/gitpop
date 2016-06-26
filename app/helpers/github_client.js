const GithubHelper = require('./github_helper');
const GithubParser = require('./github_parser');
const GithubComposer = require('./github_composer');

const TOP_HUNDRED_REPOS_PATH = '/search/repositories?q=stars\:\>1\&s=stars\&page=1&per_page=100';

function contributorsUrlPath(contributorsUrl) {
  return contributorsUrl.match(/(\/repos.*\/contributors)/)[1];
};

function onContributorFetchError(err) {
  console.warn(err);
  const unknownContributor = { login: 'Unable to fetch top contributor' };
  return [unknownContributor];
};

const GithubClient = {
  topHundredRepos: function() {
                     const repoItemsPromise = GithubHelper.fetch(TOP_HUNDRED_REPOS_PATH)
                       .then((repoData) => GithubParser.repoItems(repoData))
                       .then((rawRepoItems) => {
                         return rawRepoItems.map(
                           (rawRepoItem) => GithubComposer.composeRepo(rawRepoItem)
                         )
                       });

                     return repoItemsPromise;
                   },

  topContributorForRepo: function(contributorsUrl) {
    const contributorsPath = contributorsUrlPath(contributorsUrl);
    const contributorsPathQuery = `${contributorsPath}?page=1\&per_page=1`;

    const topContributorPromise = GithubHelper.fetch(contributorsPathQuery)
      .catch(onContributorFetchError)
      .then((contributors) => {
        const topContributor = contributors[0];
        const topContributorName = topContributor.login;
        const topContributorUrl = topContributor.html_url;

        return {
          topContributor: topContributorName,
          topContributorUrl: topContributorUrl
        }
      });

    return topContributorPromise;
  }
};

module.exports = GithubClient;
