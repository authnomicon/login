exports = module.exports = function(promptHandler, verifyHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/oob', promptHandler);
  router.post('/oob', verifyHandler);
  router.get('/oob/verify', verifyHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/login/oob/HTTPService'
];
exports['@path'] = '/login/oob';
exports['@require'] = [
  './handlers/prompt',
  './handlers/verify'
];
