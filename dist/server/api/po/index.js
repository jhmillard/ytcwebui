'use strict';

var express = require('express');
var controller = require('./po.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/poid/:poid', controller.getpoid);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router['delete']('/:id', controller.destroy);
router.get('/contractor/:contractor', controller.contractor);
router.get('/findstatus/:status', controller.findstatus);
router.put('/close/:id', controller.closepo);
router.get('/client/:client', controller.client);
router.put('/hoursused/:id', controller.hoursused);
router.put('/milestone/:id', controller.insert_milestone);

module.exports = router;
//# sourceMappingURL=index.js.map
