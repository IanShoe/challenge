var issueService = require('../services/issue');

function _create(req, res, next) {
  var issue = req.body;
  if (!issue.title) {
    return res.status(400).send('Title Required');
  }
  if (!issue.body) {
    return res.status(400).send('Body Required');
  }
  issueService.create(issue, function (err, issue) {
    if (err) {
      next('Error Creating Issue ' + err);
    } else {
      res.send(issue);
    }
  });
}

function _closeByNumber(req, res, next) {
  var number = req.params.number;
  if (!number) {
    return next('Issue Number Required');
  }
  issueService.closeByNumber(number, function (err, result) {
    if (err) {
      next('Error Closing Issue: ' + number + '\n' + err);
    } else {
      res.send(result);
    }
  });
}

function _getAll(req, res, next) {
  var opts = req.query;
  issueService.getAll(opts, function (err, issues) {
    if (err) {
      next('Error Getting Issues ' + err);
    } else {
      res.send(issues);
    }
  });
}

function _getById(req, res, next) {
  var id = req.params.id;
  if (!id) {
    return next('Issue ID Required');
  }
  issueService.getById(id, function (err, issue) {
    if (err) {
      next('Error Getting Issue By ID: ' + id + '\n' + err);
    } else {
      res.send(issue);
    }
  });
}

function _patchById(req, res, next) {
  var modifiedIssue = req.body;
  if (!modifiedIssue._id) {
    return next('Issue ID Required');
  }
  issueService.patchById(modifiedIssue, function (err, issue) {
    if (err) {
      next('Error Patching Issue By ID', modifiedIssue.id + err);
    } else {
      res.send(issue);
    }
  });
}

function _updateById(req, res, next) {
  var modifiedIssue = req.body;
  if (!modifiedIssue._id) {
    return next('Issue ID Required');
  }
  issueService.updateById(modifiedIssue, function (err, issue) {
    if (err) {
      next('Error Updating Issue By ID', modifiedIssue._id + err);
    } else {
      res.send(issue);
    }
  });
}

module.exports = exports = {
  create: _create,
  closeByNumber: _closeByNumber,
  getAll: _getAll,
  getById: _getById,
  patchById: _patchById,
  updateById: _updateById
};
