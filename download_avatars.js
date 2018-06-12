var request = require('request');
var fs = require('fs');
var authorization = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
    'Authorization': authorization.GITHUB_TOKEN
  }
};

  request(options, function(err, res, body) {
    objAvatars = JSON.parse(body);
    return cb(err, objAvatars)
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  //.on('data', function(data) {
    //console.log('Saving picture to' + filePath)
  //})
  .on('end', function() {
    console.log('Pictures saved to ' + filePath)
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  //console.log("Errors:", err);
  //console.log("Result:", result);
  console.log(result)
   result.forEach(function(element) {
    var imageURL = element.avatar_url;
    var filePathName = './avatars/' + element.login + '.jpg';
      downloadImageByURL(imageURL, filePathName);
  });
});


//downloadImageByURL("https://avatars3.githubusercontent.com/u/46987?v=4", './avatars/' )



