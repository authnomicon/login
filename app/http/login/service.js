/**
 * Login service.
 */
exports = module.exports = function(promptHandler, initiateHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/', promptHandler);
  router.post('/', promptHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/login/HTTPService'
];
exports['@path'] = '/login';
exports['@require'] = [
  './handlers/prompt',
  './handlers/initiate'
];
