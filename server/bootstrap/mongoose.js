var mongoose = require('mongoose');
var logger = console;

var models = require('../models');

function _registerDefinition(def) {
  var schema = new mongoose.Schema(def.schema, def.opts);
  schema.methods = def.methods;
  schema.statics = def.statics;
  mongoose.model(def.name, schema);
  logger.info('%s mongoose model loaded', def.name);
}

module.exports = function (config) {
  logger.info('Connecting to', config);
  mongoose.connect(config);

  var keys = Object.keys(models);

  // Models
  keys.forEach(function (key) {
    var def = models[key];
    if (Array.isArray(def)) {
      def.forEach(_registerDefinition);
    } else {
      _registerDefinition(def);
    }
  });
};
