exports = module.exports = function(promptHandler, authenticateHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/otp', promptHandler);
  router.post('/otp', authenticateHandler);
  
  return router;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/http/login/OTPService';
exports['@require'] = [
  './otp/prompt',
  './otp/authenticate'
];
