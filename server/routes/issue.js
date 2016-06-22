var issueService = require('../services/issue');

function _create(req, res, next) {
  var issue = req.body;
  issueService.create(issue, function (err, issue) {
    if (err) {
      next('Error Creating Issue ' + err);
    } else {
      res.send(issue);
    }
  });
}

function _deleteById(req, res, next) {
  var id = req.params.id;
  if (!id) {
    return next('Issue ID Required');
  }
  issueService.deleteById(id, function (err, result) {
    if (err) {
      next('Error Deleting Issue By ID: ' + id + '\n' + err);
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
  deleteById: _deleteById,
  getAll: _getAll,
  getById: _getById,
  patchById: _patchById,
  updateById: _updateById
};
