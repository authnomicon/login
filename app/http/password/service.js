exports = module.exports = function(authenticateHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.post('/', authenticateHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/http/login/PasswordService'
];
exports['@path'] = '/login/password';
exports['@require'] = [
  './handlers/authenticate'
];
