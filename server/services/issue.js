var logger = console;
var _ = require('lodash');
var config = require('config');
var mongoose = require('mongoose');
var githubService = require('../services/github');

var Issue = mongoose.model('Issue');
var issueAPI = githubService.issues;

function _create(newIssue, cb) {
  var opts = _.merge({
    user: config.github.user,
    repo: config.github.repo
  }, newIssue);
  logger.info('Creating New Issue with Github');
  issueAPI.create(opts, function (err, newIssue) {
    if (err) {
      logger.error('Error Creating New Issue with Github Service');
    }
    var issue = new Issue(newIssue);
    logger.info('Creating New Issue with Mongo');
    issue.save(function (err, dbIssue) {
      if (err) {
        logger.error('Error Saving New Issue with Mongo');
      }
      cb(err, newIssue);
    });
  });
}

function _createComment(number, comment, cb) {
  var opts = {
    user: config.github.user,
    repo: config.github.repo,
    number: number,
    body: comment
  };
  logger.info('Creating New Comment on Issue %s with Github', number);
  issueAPI.createComment(opts, function(err, commentObj) {
    if (err) {
      logger.error('Error Creating Comment on Issue %s with Github Service', number);
    }
    // TODO: add comments array onto mongo model?
    cb(err, commentObj);
  });
}

function _closeByNumber(number, cb) {
  var opts = {
    user: config.github.user,
    repo: config.github.repo,
    number: number,
    state: 'closed'
  };
  logger.info('Closing Issue %s with Github', number);
  issueAPI.edit(opts, function (err, updatedIssue) {
    if (err) {
      logger.error('Error Closing Issue: %s ', number);
    }
    cb(err, updatedIssue);
  });
}

function _getAll(query, cb) {
  // TODO: Demonstrate filter by repo/user?
  logger.info('Retrieving all Issues with Github');
  issueAPI.getAll(query, function (err, issues) {
    if (err) {
      logger.error('Error Retrieving Issues from Github Service');
    } else if (issues && issues.length) {
      logger.info('Found %s Issues', issues.length);
    }
    cb(err, issues);
  });
  // Issue.find(query).exec(cb);
}

function _getByNumber(number, cb) {
  var opts = {
    user: config.github.user,
    repo: config.github.repo,
    number: number
  };
  logger.info('Getting Issue %s with Github', number);
  issueAPI.get(opts, function (err, issue) {
    if (err) {
      logger.error('Error Retrieving Issue:', number);
    }
    cb(err, issue);
  });

  // Issue.findByNumber(number).exec(cb);
}

function _patchByNumber(number, modifiedIssue, cb) {
  // Issue.findOneAndUpdate({
  //   _id: modifiedIssue._id
  // }, modifiedIssue, {
  //   new: true
  // }).exec(cb);
}

function _updateByNumber(number, modifiedIssue, cb) {
  var opts = _.merge({
    user: config.github.user,
    repo: config.github.repo,
    number: number
  }, modifiedIssue);
  logger.info('Updating Issue %s with Github', number);
  issueAPI.edit(opts, function (err, updatedIssue) {
    if (err) {
      logger.error('Error Editing Issue: %s ', number);
    }
    logger.info('Updating Issue %s with Mongo', number);
    Issue.findOneAndUpdate({
      id: modifiedIssue.id
    }, modifiedIssue, {
      new: true
    }).exec(function (err) {
      if (err) {
        logger.error('Error Editing Issue: %s with mongo', number);
      }
      cb(err, updatedIssue);
    });
  });
}

module.exports = {
  create: _create,
  createComment: _createComment,
  closeByNumber: _closeByNumber,
  getAll: _getAll,
  getByNumber: _getByNumber,
  patchByNumber: _patchByNumber,
  updateByNumber: _updateByNumber
};
