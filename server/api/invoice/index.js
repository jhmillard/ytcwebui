'use strict';

var express = require('express');
var async = require('async');
var controller = require('./invoice.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/removetime',controller.removetimesheet);
router.get('/status/:status',controller.querybystatus);
router.get('/po/:poid',controller.querybypo);

module.exports = router;
