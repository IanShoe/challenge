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

function _createComment(req, res, next) {
  var number = req.params.number;
  var comment = req.body.comment;
  if (!number) {
    return res.status(400).send('Issue Number Required');
  }
  if (!comment) {
    return res.status(400).send('Body Required');
  }
  issueService.createComment(number, comment, function (err, issue) {
    if (err) {
      next('Error Creating Issue Comment ' + err);
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

function _getByNumber(req, res, next) {
  var number = req.params.number;
  if (!number) {
    return next('Issue Number Required');
  }
  issueService.getByNumber(number, function (err, issue) {
    if (err) {
      next('Error Getting Issue By Number: ' + number + '\n' + err);
    } else {
      res.send(issue);
    }
  });
}

function _patchByNumber(req, res, next) {
  var modifiedIssue = req.body;
  var number = req.params.number;
  if (!number) {
    return next('Issue Number Required');
  }
  issueService.patchByNumber(number, modifiedIssue, function (err, issue) {
    if (err) {
      next('Error Patching Issue By Number', modifiedIssue.id + err);
    } else {
      res.send(issue);
    }
  });
}

function _updateByNumber(req, res, next) {
  var modifiedIssue = req.body;
  var number = req.params.number;
  if (!number) {
    return next('Issue Number Required');
  }
  issueService.updateByNumber(number, modifiedIssue, function (err, issue) {
    if (err) {
      next('Error Updating Issue By Number', modifiedIssue.number + err);
    } else {
      res.send(issue);
    }
  });
}

module.exports = exports = {
  create: _create,
  createComment: _createComment,
  closeByNumber: _closeByNumber,
  getAll: _getAll,
  getByNumber: _getByNumber,
  patchByNumber: _patchByNumber,
  updateByNumber: _updateByNumber
};
