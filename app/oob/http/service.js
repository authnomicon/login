exports = module.exports = function(promptHandler, verifyHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/', promptHandler);
  router.post('/', verifyHandler);
  router.get('/verify', verifyHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/oob';
exports['@require'] = [
  './handlers/prompt',
  './handlers/verify'
];
