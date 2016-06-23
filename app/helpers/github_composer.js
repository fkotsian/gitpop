const GithubHelper = require('./github_helper');

function contributorsUrlPath(contributorsUrl) {
  return contributorsUrl.match(/(\/repos.*\/contributors)/)[1];
};

function onContributorFetchError(err) {
  console.warn(err);
  const unknownContributor = { login: 'Unable to fetch contributor' };
  return [unknownContributor];
};

const GithubComposer = {
  composeRepo: function(rawRepoData) {
                 const contributorsUrl = rawRepoData.contributors_url;
                 const contributorsPath = contributorsUrlPath(contributorsUrl);
                 const contributorsPathQuery = `${contributorsPath}?page=1\&per_page=1`;
                 const contributorsPromise = GithubHelper.fetch(contributorsPathQuery);

                 const repoObjPromise = contributorsPromise
                   .catch(onContributorFetchError)
                   .then((contributors) => {
                     const name = rawRepoData.name;
                     const stars = rawRepoData.stargazers_count;
                     const description = rawRepoData.description;
                     const avatarUrl = rawRepoData.owner.avatar_url;
                     const htmlUrl = rawRepoData.html_url;
                     const topContributor = contributors[0];
                     const topContributorName = topContributor.login;
                     const topContributorUrl = topContributor.html_url;

                     return {
                       name: name,
                       stars: stars,
                       description: description,
                       avatarUrl: avatarUrl,
                       htmlUrl: htmlUrl,
                       topContributor: topContributorName,
                       topContributorUrl: topContributorUrl
                     };
                   });

                return repoObjPromise;
               }
};

module.exports = GithubComposer;
