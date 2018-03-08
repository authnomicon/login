exports = module.exports = function(promptHandler, authenticateHandler, newHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/otp', promptHandler);
  router.post('/otp', authenticateHandler);
  
  // TODO: Move this to a separate service
  
  router.get('/otp/enroll', newHandler);
  
  return router;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/login/http/OTPService';
exports['@require'] = [
  './handlers/prompt',
  './handlers/authenticate',
  './handlers/enroll/new'
];
