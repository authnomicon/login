exports = module.exports = function(authenticateHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.post('/password', authenticateHandler);
  
  return router;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/http/login/PasswordService';
exports['@require'] = [
  './password/authenticate'
];
