var request = require('request');
var fs = require('fs');
var authorization = require('./secrets.js');
var owner = process.argv.slice(2,3);
var repo = process.argv.slice(3);

console.log('Welcome to the GitHub Avatar Downloader!');

//sets the url to be queried and the user information needed to access github api.
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
    'User-Agent': 'request',
    'Authorization': authorization.GITHUB_TOKEN
    }
  }
  //exits the programs if user does not input a repo owner or repo name.
  if (!owner.length || !repo.length) {
    console.log('Please specify a repo owner followed by a repo name.');
    return;
  };

  //retrieves collaborator information from url and turns it into an array of objects.
  request(options, function(err, res, body) {
    objAvatars = JSON.parse(body);
    cb(err, objAvatars);
  });
}

//takes the image urls and filepath from the callback function and writes the images to the filepath.
  function downloadImageByURL(url, filePath) {
    if (!fs.existsSync('avatars')) {
      fs.mkdirSync('avatars');
    }
    request.get(url)
      .on('response', function() {
      console.log('Saving picture to ' + filePath);
  })
  .pipe(fs.createWriteStream(filePath));
  }

//takes the array of objects objAvatars and loops through them to retrieve image urls as well as the naming for the filepath.
getRepoContributors(owner, repo, function(err, result) {
    result.forEach(function(element) {
    var imageURL = element.avatar_url;
    var filePathName = 'avatars/' + element.login + '.jpg';
      downloadImageByURL(imageURL, filePathName);
    });
});




