'use strict';

import _ from 'lodash';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

var nodemailer = require('nodemailer');



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
    console.log('inside Save Updates')
    //var updated = _.merge(entity, updates);
    var updated = _.assign(entity,updates);
    console.log("Merge Has happened");
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
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


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log("error: " + err);
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}


/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

// Updates an existing Po in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  console.log("before find by id async: " + req.params.id);
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}


export function getrole(req, res) {
  User.findAsync({role: req.params.role})
    .then(respondWithResult(res))
    .catch(handleError(res));
}


export function sendEmail(req,res){

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
    html: "<table> <tr> <td><b>Contractor: " + req.body.contractor + "</b></td> </tr> <tr> <td>Hours Entered: " + req.body.hours +
          "</td> </tr> <tr> <td>Purchase Order: " + req.body.po + "</td> </tr>" +
          "<tr> <td>Client: " + req.body.po + "</td> </tr>" +
          "<tr> <td>Client: " + req.body.po + "</td> </tr>" +
          "<tr> <td>Client: " + req.body.po + "</td> </tr>" +
          "<tr> <td>Client: " + req.body.po + "</td> </tr>" +
          "</table>"








  };

  var transporter = nodemailer.createTransport(smtpConfig);
  transporter.sendMail(mailData,(error,response)=>{
      if(error){
        console.log(error);
        var statusCode = 500;
        res.status(statusCode).send(error);
        return res;

      }else{
        console.log("Message Sent: " + response.message);
        res.status(200).send(response);
      }

  })

  //this will use the node email structure to send an email using data from the request
  //req.body will contain all of the information required to send the mail.

  //use nodemailer:



}
