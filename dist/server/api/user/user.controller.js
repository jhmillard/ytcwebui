'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.index = index;
exports.create = create;
exports.show = show;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.me = me;
exports.update = update;
exports.authCallback = authCallback;
exports.getrole = getrole;
exports.sendEmail = sendEmail;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _userModel = require('./user.model');

var _userModel2 = _interopRequireDefault(_userModel);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _configEnvironment = require('../../config/environment');

var _configEnvironment2 = _interopRequireDefault(_configEnvironment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var nodemailer = require('nodemailer');

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
    console.log('inside Save Updates');
    //var updated = _.merge(entity, updates);
    var updated = _lodash2['default'].assign(entity, updates);
    console.log("Merge Has happened");
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
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

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log("error: " + err);
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */

function index(req, res) {
  _userModel2['default'].findAsync({}, '-salt -password').then(function (users) {
    res.status(200).json(users);
  })['catch'](handleError(res));
}

/**
 * Creates a new user
 */

function create(req, res, next) {
  var newUser = new _userModel2['default'](req.body);
  newUser.provider = 'local';
  newUser.saveAsync().spread(function (user) {
    var token = _jsonwebtoken2['default'].sign({ _id: user._id }, _configEnvironment2['default'].secrets.session, {
      expiresIn: 60 * 60 * 5
    });
    res.json({ token: token });
  })['catch'](validationError(res));
}

/**
 * Get a single user
 */

function show(req, res, next) {
  var userId = req.params.id;

  _userModel2['default'].findByIdAsync(userId).then(function (user) {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user);
  })['catch'](function (err) {
    return next(err);
  });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */

function destroy(req, res) {
  _userModel2['default'].findByIdAndRemoveAsync(req.params.id).then(function () {
    res.status(204).end();
  })['catch'](handleError(res));
}

/**
 * Change a users password
 */

function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  _userModel2['default'].findByIdAsync(userId).then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      return user.saveAsync().then(function () {
        res.status(204).end();
      })['catch'](validationError(res));
    } else {
      return res.status(403).end();
    }
  });
}

/**
 * Get my info
 */

function me(req, res, next) {
  var userId = req.user._id;

  _userModel2['default'].findOneAsync({ _id: userId }, '-salt -password').then(function (user) {
    // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  })['catch'](function (err) {
    return next(err);
  });
}

// Updates an existing Po in the DB

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  console.log("before find by id async: " + req.params.id);
  _userModel2['default'].findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res))['catch'](handleError(res));
}

/**
 * Authentication callback
 */

function authCallback(req, res, next) {
  res.redirect('/');
}

function getrole(req, res) {
  _userModel2['default'].findAsync({ role: req.params.role }).then(respondWithResult(res))['catch'](handleError(res));
}

function sendEmail(req, res) {

  var smtpConfig = {
    host: 'box895.bluehost.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'info@yellowtoadconsulting.com',
      pass: '$theCure1001'
    }
  };

  var mailData = {
    from: 'info@yellowtoadconsulting.com',
    to: 'john.millard@yellowtoadconsulting.com',
    subject: 'Time Entered For: ' + req.body.contractor,
    text: 'Plaintext version of the message',
    html: "<table> <tr> <td><h2 style='color:blue'><b>Contractor: " + req.body.contractor + "</b></h2></td> </tr>" + "<tr> <td>Hours Entered: <h1 style='color:red'>" + req.body.hours + "</h1>" + "</td> </tr> <tr> <td>Purchase Order: <h1 style='color:green'>" + req.body.po.name + "</h1></td> </tr>" + "<tr> <td>Date: " + req.body.short_date + "</td> </tr>" + "<tr> <td>Type: " + req.body.category + "</td> </tr>" + "<tr> <td>Description: " + req.body.desc + "</td> </tr>" + "</table>"

  };

  var transporter = nodemailer.createTransport(smtpConfig);
  transporter.sendMail(mailData, function (error, response) {
    if (error) {
      console.log(error);
      var statusCode = 500;
      res.status(statusCode).send(error);
      return res;
    } else {
      console.log("Message Sent: " + response.message);
      res.status(200).send(response);
    }
  });

  //this will use the node email structure to send an email using data from the request
  //req.body will contain all of the information required to send the mail.

  //use nodemailer:
}
//# sourceMappingURL=user.controller.js.map
