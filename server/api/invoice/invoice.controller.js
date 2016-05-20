/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/invoices              ->  index
 * POST    /api/invoices              ->  create
 * GET     /api/invoices/:id          ->  show
 * PUT     /api/invoices/:id          ->  update
 * DELETE  /api/invoices/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Invoice from './invoice.model';
import User from '../user/user.model';
var async = require('async');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    //var updated = _.merge(entity, updates);
    var updated = _.assign(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Invoices
export function index(req, res) {
  Invoice.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Invoice from the DB
export function show(req, res) {
  Invoice.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Invoice in the DB
export function create(req, res) {

  //Ok... before we can create an invoice we need to first
  //Update the User Timesheets associated with it - set them to somethign.

  async.each(req.body.timesheets,
    function (item, callback) {
      User.findOneAndUpdate(
        {"_id": item.user_id, "timesheets._id": item.id},
        {"$set": {"timesheets.$.status": "invoiced"}},
        function () {
          callback();
        }
      )
    },
    function(req,res) {
      //do stuff on return - need to figure out how to pass in the
      //original req,res
    }
  )
  Invoice.createAsync(req.body)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Invoice in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }


  async.each(req.body.timesheets,
    function (item, callback) {
      User.findOneAndUpdate(
        {"_id": item.user_id, "timesheets._id": item.id},
        {"$set": {"timesheets.$.status": req.body.status}},
        function () {
          callback();
        });
    },
    function(req,res) {
      //do stuff on return - need to figure out how to pass in the
      //original req,res
    }
  )


  Invoice.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Invoice from the DB
export function destroy(req, res) {
  Invoice.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function removetimesheet(req,res){

  //Invoice.update( {}, { $pull : { timesheets : {"id": req.body.timesheet_id} } }, false, false);

  User.findOneAndUpdate(
    {"_id": req.body.user_id,"timesheets._id": req.body.timesheet_id},
    {"$set": {"timesheets.$.status": "entered"}},
    function(){
      console.log("Timesheet_id: " + req.body.timesheet_id);
      console.log("Invoice ID: " + req.body.invoice_id);
      Invoice.update( {_id: req.body.invoice_id}, { $pull : { timesheets : {"id": req.body.timesheet_id} } }, false, false)
      .then(respondWithResult(res))
    }
  )

}

export function querybystatus(req,res){

  Invoice.findAsync({status: req.params.status})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function querybypo(req,res){
  Invoice.findAsync({"po._id":  req.params.poid})
  .then(respondWithResult(res))
  .catch(handleError(res));
}
