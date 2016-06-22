var fs = require('fs');
var path = require('path');
var stringUtil = require('./string');

function exportDirectory(dir) {
  var exporter = {};
  var files = fs.readdirSync(dir);
  files = files.filter(function (file) {
    var isDir = fs.statSync(path.join(dir, file)).isDirectory();
    var isIndex = !file.indexOf('index');
    var isJS = file.indexOf('.js') !== -1;
    return !isIndex && (isDir || isJS);
  });

  files.forEach(function (file) {
    var name = stringUtil.toCamelCase(file.split('.')[0]);
    exporter[name] = require(dir + '/' + file);
  });
  return exporter;
}

module.exports = {
  exportDirectory: exportDirectory
};
