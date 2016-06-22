var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var methodOverride = require('method-override');

var middleware = require('../middleware');
var routers = require('../routers');

var app = express();
// var clientDir = path.join(__dirname, '../../client');

module.exports = function (config) {
  app.use(methodOverride());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  // app.use('/dist', express.static(clientDir + '/dist'));
  app.use('/api', routers.api);
  app.use(middleware.error.clientMessenger);
  app.use(middleware.error.logger);
  return app;
};
