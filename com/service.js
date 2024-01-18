// Module dependencies.
var express = require('express');

/**
 * Login service.
 */
exports = module.exports = function(promptHandler) {
  var router = express.Router();
  router.get('/', promptHandler);
  
  return router;
};

// Module annotations.
exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login';
exports['@require'] = [
  './handlers/prompt'
];
