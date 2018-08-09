exports = module.exports = function(promptHandler, registerHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/', promptHandler);
  router.post('/', registerHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/signup/HTTPService'
];
exports['@path'] = '/signup';
exports['@require'] = [
  './handlers/prompt',
  './handlers/register'
];
