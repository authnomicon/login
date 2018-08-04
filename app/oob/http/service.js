exports = module.exports = function(promptHandler, authenticateHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/oob', promptHandler);
  router.get('/oob/verify', authenticateHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/http/login/OOBService'
];
exports['@path'] = '/login/oob';
exports['@require'] = [
  './handlers/prompt',
  './handlers/authenticate'
];
