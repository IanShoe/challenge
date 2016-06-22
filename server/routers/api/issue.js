var express = require('express');

var routes = require('../../routes/issue');

var router = express.Router();

router.get('/', routes.getAll);
router.get('/:number', routes.getByNumber);
router.post('/', routes.create);
router.put('/:number', routes.updateByNumber);
router.patch('/:number/close', routes.closeByNumber);
router.patch('/:number', routes.patchByNumber);

module.exports = router;
