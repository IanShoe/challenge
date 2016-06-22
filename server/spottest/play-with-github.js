var GitHub = require('github');
var config = require('config');

var github = new GitHub({
  debug: true,
  protocol: "https",
  host: "api.github.com",
  timeout: 5000,
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
});

github.authenticate({
  type: "oauth",
  token: config.github.token
});

var opts = {};

github.issues.getAll(opts, function (err, res) {
  console.log(JSON.stringify(res));
});
