module.exports = function(err, req, res, next) {
  // This would be a good place to setup alerts
  // Follow whatever error model we come up with
  // res.status(err.status).send(err.title + '\n' + err.description);

  res.status(500).send(err);
  next(err);
};
