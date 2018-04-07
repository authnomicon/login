exports = module.exports = function(promptHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/', promptHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/http/login/Service'
];
exports['@path'] = '/login';
exports['@require'] = [
  './handlers/prompt'
];
