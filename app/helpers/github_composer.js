const GithubComposer = {
  composeRepo: function(rawRepoData) {
                 const name = rawRepoData.name;
                 const stars = rawRepoData.stargazers_count;
                 const description = rawRepoData.description;
                 const avatarUrl = rawRepoData.owner.avatar_url;
                 const htmlUrl = rawRepoData.html_url;
                 const contributorsUrl = rawRepoData.contributors_url;

                 return {
                   name: name,
                   stars: stars,
                   description: description,
                   avatarUrl: avatarUrl,
                   htmlUrl: htmlUrl,
                   contributorsUrl: contributorsUrl
                 }
  }
};

module.exports = GithubComposer;
