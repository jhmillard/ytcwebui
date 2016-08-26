/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pos              ->  index
 * POST    /api/pos              ->  create
 * GET     /api/pos/:id          ->  show
 * PUT     /api/pos/:id          ->  update
 * DELETE  /api/pos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Po from './po.model';

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
    var updated = _.merge(entity, updates);
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

// Gets a list of Pos
export function index(req, res) {
  Po.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Po from the DB
export function show(req, res) {
  Po.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Po in the DB
export function create(req, res) {
  Po.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Po in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Po.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Closes a PO
export function closepo(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Po.findOne({_id:req.body._id},function(err,doc){
    doc.status = 'closed';
    doc.save();
  })


  //Po.(req.params.id)
  //  .then(handleEntityNotFound(res))
  //  .then(PO.udpate)
  //  .then(respondWithResult(res))
  //  .catch(handleError(res));
}

// Updates hours used on a PO
export function hoursused(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  console.log("PO hours used params id:" + req.params.id);
  console.log("PO hours used body id" + req.body._id);
  console.log("PO hours used" + req.body.hours);
  Po.findOne({_id:req.params.id},function(err,doc){
    doc.hours_used = doc.hours_used + req.body.hours;
    doc.save();
  }).then(respondWithResult(res))
  .catch(handleError(res));


  //Po.(req.params.id)
  //  .then(handleEntityNotFound(res))
  //  .then(PO.udpate)
  //  .then(respondWithResult(res))
  //  .catch(handleError(res));
}

// Deletes a Po from the DB
export function destroy(req, res) {
  Po.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets a list of Pos
export function contractor(req, res) {
  console.log("PO contractor used params id:" + req.params.contractor);
  Po.findAsync({contractor: req.params.contractor})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Pos
export function client(req, res) {
  Po.findAsync({client: req.params.client})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function findstatus(req,res) {
  Po.findAsync({status: req.params.status})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Po from the DB
export function getpoid(req, res) {
  Po.findOne({poid: req.params.poid})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function insert_milestone(req,res){

}

