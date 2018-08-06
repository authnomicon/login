/**
 * Password authentication service.
 *
 * This component provides an HTTP service that authenticates an end-user using
 * a username and password.
 *
 * This service is intended to be used by web applications using HTML forms (as
 * opposed to user agents using headers defined by the HTTP Authentication
 * framework).  Use of HTML allows the application to present a user interface
 * of its own design.
 */
exports = module.exports = function(authenticateHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.post('/', authenticateHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/login/password/HTTPService'
];
exports['@path'] = '/login/password';
exports['@require'] = [
  './handlers/authenticate'
];