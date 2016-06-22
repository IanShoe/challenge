var express = require('express');

var routes = require('../../routes/issue');

var router = express.Router();

router.get('/', routes.getAll);
router.get('/:id', routes.getById);
router.post('/', routes.create);
router.put('/:id', routes.updateById);
router.patch('/:id', routes.patchById);
router.delete('/:id', routes.deleteById);

module.exports = router;
