var express = require('express');

var routes = require('../../routes/issue');

var router = express.Router();

router.get('/', routes.getAll);
router.get('/:number', routes.getByNumber);
router.post('/', routes.create);
router.put('/:number', routes.updateByNumber);
router.patch('/:number/close', routes.closeByNumber);
router.patch('/:number', routes.patchByNumber);

// Comment routes, could probably abstract it into it's own but it's very tied to issues as well
router.post('/:number/comment', routes.createComment);

module.exports = router;
