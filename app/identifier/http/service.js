exports = module.exports = function(promptHandler, routeHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/', promptHandler);
  router.post('/', routeHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/identifier';
exports['@require'] = [
  './handlers/prompt',
  './handlers/route'
];
