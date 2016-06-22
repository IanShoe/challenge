var logger = console;
var mongoose = require('mongoose');
var githubService = require('../services/github');

var Issue = mongoose.model('Issue');
var issueAPI = githubService.issues;

function _create(newIssue, cb) {
  var org = new Issue(newIssue);
  org.save(cb);
}

function _deleteById(id, cb) {
  cb('NYI');
}

function _getAll(query, cb) {
  issueAPI.getAll(query, function (err, issues) {
    if (err) {
      logger.error('Error Retrieving Issues from Github Service');
    }
    cb(err, issues);
  });
  // Issue.find(query).exec(cb);
}

function _getById(id, cb) {
  Issue.findById(id).exec(cb);
}

function _patchById(patchObj, cb) {
  cb('NYI');
}

function _updateById(modifiedIssue, cb) {
  Issue.findOneAndUpdate({
    _id: modifiedIssue._id
  }, modifiedIssue, {
    new: true
  }).exec(cb);
}

module.exports = {
  create: _create,
  deleteById: _deleteById,
  getAll: _getAll,
  getById: _getById,
  patchById: _patchById,
  updateById: _updateById
};
