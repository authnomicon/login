// Module dependencies.
var express = require('express');

exports = module.exports = function(promptHandler, routeHandler) {
  var router = new express.Router();
  router.get('/', promptHandler);
  router.post('/', routeHandler);
  
  return router;
};

// Module annotations.
exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/identifier';
exports['@require'] = [
  './handlers/prompt',
  './handlers/route'
];
