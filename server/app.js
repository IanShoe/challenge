#!/usr/bin/env node

var config = require('config');
// Generally pick some kind of logging library. We use loglove
var logger = console;
// Bootstrap Mongoose
require('./bootstrap/mongoose')(config.mongo);

// Creates app with a host and port
var app = require('./bootstrap/express')(config);

app.listen(config.port, config.host, function (err) {
  if (err) {
    logger.error('Tinder Challenged failed to start');
  } else {
    logger.info('Tinder Challenged listening on port: %d and host: %s NODE_ENV: %s', this.address().port, this.address().address, process.env.NODE_ENV);
  }
});
