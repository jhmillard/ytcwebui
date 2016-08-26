/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pos              ->  index
 * POST    /api/pos              ->  create
 * GET     /api/pos/:id          ->  show
 * PUT     /api/pos/:id          ->  update
 * DELETE  /api/pos/:id          ->  destroy
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
exports.closepo = closepo;
exports.hoursused = hoursused;
exports.destroy = destroy;
exports.contractor = contractor;
exports.client = client;
exports.findstatus = findstatus;
exports.getpoid = getpoid;
exports.insert_milestone = insert_milestone;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _poModel = require('./po.model');

var _poModel2 = _interopRequireDefault(_poModel);

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
    var updated = _lodash2['default'].merge(entity, updates);
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

// Gets a list of Pos

function index(req, res) {
  _poModel2['default'].findAsync().then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a single Po from the DB

function show(req, res) {
  _poModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(respondWithResult(res))['catch'](handleError(res));
}

// Creates a new Po in the DB

function create(req, res) {
  _poModel2['default'].createAsync(req.body).then(respondWithResult(res, 201))['catch'](handleError(res));
}

// Updates an existing Po in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _poModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res))['catch'](handleError(res));
}

// Closes a PO

function closepo(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _poModel2['default'].findOne({ _id: req.body._id }, function (err, doc) {
    doc.status = 'closed';
    doc.save();
  });

  //Po.(req.params.id)
  //  .then(handleEntityNotFound(res))
  //  .then(PO.udpate)
  //  .then(respondWithResult(res))
  //  .catch(handleError(res));
}

// Updates hours used on a PO

function hoursused(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  console.log("PO hours used params id:" + req.params.id);
  console.log("PO hours used body id" + req.body._id);
  console.log("PO hours used" + req.body.hours);
  _poModel2['default'].findOne({ _id: req.params.id }, function (err, doc) {
    doc.hours_used = doc.hours_used + req.body.hours;
    doc.save();
  }).then(respondWithResult(res))['catch'](handleError(res));

  //Po.(req.params.id)
  //  .then(handleEntityNotFound(res))
  //  .then(PO.udpate)
  //  .then(respondWithResult(res))
  //  .catch(handleError(res));
}

// Deletes a Po from the DB

function destroy(req, res) {
  _poModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res))['catch'](handleError(res));
}

// Gets a list of Pos

function contractor(req, res) {
  console.log("PO contractor used params id:" + req.params.contractor);
  _poModel2['default'].findAsync({ contractor: req.params.contractor }).then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a list of Pos

function client(req, res) {
  _poModel2['default'].findAsync({ client: req.params.client }).then(respondWithResult(res))['catch'](handleError(res));
}

function findstatus(req, res) {
  _poModel2['default'].findAsync({ status: req.params.status }).then(respondWithResult(res))['catch'](handleError(res));
}

// Gets a single Po from the DB

function getpoid(req, res) {
  _poModel2['default'].findOne({ poid: req.params.poid }).then(respondWithResult(res))['catch'](handleError(res));
}

function insert_milestone(req, res) {}
//# sourceMappingURL=po.controller.js.map
