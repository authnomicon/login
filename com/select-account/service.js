exports = module.exports = function(promptHandler, selectHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/', promptHandler);
  router.post('/', selectHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/select-account';
exports['@require'] = [
  './handlers/prompt',
  './handlers/select'
];
