exports = module.exports = function(promptHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/otp', promptHandler);
  
  return router;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/http/login/OTPService';
exports['@require'] = [
  './otp/prompt'
];
