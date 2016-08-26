/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/invoices              ->  index
 * POST    /api/invoices              ->  create
 * GET     /api/invoices/:id          ->  show
 * PUT     /api/invoices/:id          ->  update
 * DELETE  /api/invoices/:id          ->  destroy
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.removetimesheet = removetimesheet;
exports.querybystatus = querybystatus;
exports.querybypo = querybypo;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _invoiceModel = require('./invoice.model');

var _invoiceModel2 = _interopRequireDefault(_invoiceModel);

var _userUserModel = require('../user/user.model');

var _userUserModel2 = _interopRequireDefault(_userUserModel);

var async = require('async');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    //var updated = _.merge(entity, updates);
    var updated = _lodash2['default'].assign(entity, updates);
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Invoices

function index(req, res) {
  _invoiceModel2['default'].findAsync().then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a single Invoice from the DB

function show(req, res) {
  _invoiceModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(respondWithResult(res))['catch'](handleError(res));
}

// Creates a new Invoice in the DB

function create(req, res) {

  //Ok... before we can create an invoice we need to first
  //Update the User Timesheets associated with it - set them to somethign.

  async.each(req.body.timesheets, function (item, callback) {
    _userUserModel2['default'].findOneAndUpdate({ "_id": item.user_id, "timesheets._id": item.id }, { "$set": { "timesheets.$.status": "invoiced" } }, function () {
      callback();
    });
  }, function (req, res) {
    //do stuff on return - need to figure out how to pass in the
    //original req,res
  });
  _invoiceModel2['default'].createAsync(req.body).then(respondWithResult(res))['catch'](handleError(res));
}

// Updates an existing Invoice in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  async.each(req.body.timesheets, function (item, callback) {
    _userUserModel2['default'].findOneAndUpdate({ "_id": item.user_id, "timesheets._id": item.id }, { "$set": { "timesheets.$.status": req.body.status } }, function () {
      callback();
    });
  }, function (req, res) {
    //do stuff on return - need to figure out how to pass in the
    //original req,res
  });

  _invoiceModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res))['catch'](handleError(res));
}

// Deletes a Invoice from the DB

function destroy(req, res) {
  _invoiceModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}

function removetimesheet(req, res) {

  //Invoice.update( {}, { $pull : { timesheets : {"id": req.body.timesheet_id} } }, false, false);

  _userUserModel2['default'].findOneAndUpdate({ "_id": req.body.user_id, "timesheets._id": req.body.timesheet_id }, { "$set": { "timesheets.$.status": "entered" } }, function () {
    console.log("Timesheet_id: " + req.body.timesheet_id);
    console.log("Invoice ID: " + req.body.invoice_id);
    _invoiceModel2['default'].update({ _id: req.body.invoice_id }, { $pull: { timesheets: { "id": req.body.timesheet_id } } }, false, false).then(respondWithResult(res));
  });
}

function querybystatus(req, res) {

  _invoiceModel2['default'].findAsync({ status: req.params.status }).then(respondWithResult(res))['catch'](handleError(res));
}

function querybypo(req, res) {
  _invoiceModel2['default'].findAsync({ "po._id": req.params.poid }).then(respondWithResult(res))['catch'](handleError(res));
}
//# sourceMappingURL=invoice.controller.js.map
