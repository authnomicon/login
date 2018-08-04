exports = module.exports = function(promptHandler, authenticateHandler, newHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/', promptHandler);
  router.post('/', authenticateHandler);
  
  // TODO: Move this to a separate service
  
  //router.get('/otp/enroll', newHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/login/otp/HTTPService'
];
exports['@path'] = '/login/otp';
exports['@require'] = [
  './handlers/prompt',
  './handlers/authenticate',
  './handlers/enroll/new'
];
