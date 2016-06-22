var logger = console;
module.exports = function(err, req, res, next) {
  // This would be a good place to setup alerts
  // Or have a separate alert.js middleware
  // Follow whatever error model we come up with
  logger.error(err);
};
