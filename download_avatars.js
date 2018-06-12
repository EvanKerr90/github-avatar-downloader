var request = require('request');
var fs = require('fs');
var authorization = require('./secrets.js');
var owner = process.argv.slice(2,3);
var repo = process.argv.slice(3);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
    'User-Agent': 'request',
    'Authorization': authorization.GITHUB_TOKEN
    }
  }

  if (!owner.length || !repo.length) {
    console.log('Please specify a repo owner and a repo name.');
    return;
  }

  request(options, function(err, res, body) {
    objAvatars = JSON.parse(body);
    return cb(err, objAvatars)
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('end', function() {
    console.log('Pictures saved to ' + filePath);
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, function(err, result) {
  //console.log("Errors:", err);
  //console.log("Result:", result);
    result.forEach(function(element) {
    var imageURL = element.avatar_url;
    var filePathName = './avatars/' + element.login + '.jpg';
      downloadImageByURL(imageURL, filePathName);
  });
});

//downloadImageByURL("https://avatars3.githubusercontent.com/u/46987?v=4", './avatars/' )



