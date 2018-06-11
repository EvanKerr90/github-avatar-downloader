var request = require('request');
var authorization = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
    'Authorization': authorization
  }
};

  request(options, function(err, res, body) {
    objAvatars = JSON.parse(body);
    return cb(err, objAvatars)
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  //console.log("Errors:", err);
  //console.log("Result:", result);
  for (each in result) {
    console.log(result[each]['avatar_url'])
  }
});
