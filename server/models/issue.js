var IssueDefinition = {
  name: 'Issue',
  opts: {
    collection: 'issues'
  },
  schema: {
    body: String,
    closed_at: String,
    comments_url: String,
    comments: Number,
    created_at: String,
    events_url: String,
    html_url: String,
    id: Number,
    labels_url: String,
    locked: Boolean,
    milestone: String,
    number: Number,
    repository_url: String,
    state: String,
    title: String,
    updated_at: String,
    url: String
  }
};

module.exports = IssueDefinition;
