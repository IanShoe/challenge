var mongoose = require('mongoose');

var IssueDefinition = {
  name: 'Issue',
  opts: {
    collection: 'issues'
  },
  schema: {
    title: String,
    description: String,
    body: String,
    createDate: {
      type: Date,
      default: Date.now
    }
  }
};

module.exports = IssueDefinition;
