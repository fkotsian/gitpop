const desiredFields = ['name', 'stars', 'top_contributor'];

function validateJson(data) {
  if (data.constructor !== Object) throw invalidJsonError();
}; 

function invalidJsonError() {
  return new Error('Data passed to GithubParser is not valid JSON.');
};

const GithubParser = {
  repoItems: (rawResponse) => { 
               validateJson(rawResponse); 
               return rawResponse.items; 
             }
};

module.exports = GithubParser;
