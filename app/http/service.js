/**
 * Login service.
 */
exports = module.exports = function(promptHandler, initiateHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/', promptHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login';
exports['@require'] = [
  './handlers/prompt'
];
