var express = require('express');

var apiRouters = require('./api/');

var router = express.Router();
var keys = Object.keys(apiRouters);
keys.forEach(function (key) {
  // TODO: convert this back to dash case?
  router.use('/' + key, apiRouters[key]);
});

module.exports = router;
