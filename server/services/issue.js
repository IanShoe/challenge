var logger = console;
var config = require('config');
var _ = require('lodash');
var mongoose = require('mongoose');
var githubService = require('../services/github');

var Issue = mongoose.model('Issue');
var issueAPI = githubService.issues;

function _create(newIssue, cb) {
  var opts = _.merge({
    user: config.github.user,
    repo: config.github.repo,
  }, newIssue);
  issueAPI.create(opts, function (err, newIssue) {
    if (err) {
      logger.error('Error Creating New Issue with Github Service');
    }
    var issue = new Issue(newIssue);
    issue.save(function (err, dbIssue) {
      if (err) {
        logger.error('Error Saving New Issue with Mongo');
      }
      cb(err, newIssue);
    });
  });

}

function _closeByNumber(number, cb) {
  var opts = {
    user: config.github.user,
    repo: config.github.repo,
    number: number,
    state: 'closed'
  };
  issueAPI.edit(opts, function (err, updatedIssue) {
    if (err) {
      logger.error('Error Closing Issue: %s ', number);
    }
    cb(err, updatedIssue);
  });
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
  closeByNumber: _closeByNumber,
  getAll: _getAll,
  getById: _getById,
  patchById: _patchById,
  updateById: _updateById
};
