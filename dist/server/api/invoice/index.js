'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _authAuthService = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_authAuthService);

var express = require('express');
var async = require('async');
var controller = require('./invoice.controller');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router['delete']('/:id', controller.destroy);
router.post('/removetime', controller.removetimesheet);
router.get('/status/:status', controller.querybystatus);
router.get('/po/:poid', controller.querybypo);

module.exports = router;
//# sourceMappingURL=index.js.map
