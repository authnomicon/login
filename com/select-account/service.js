// Module dependencies.
var express = require('express');

exports = module.exports = function(promptHandler, selectHandler) {
  var router = express.Router();
  router.get('/', promptHandler);
  router.post('/', selectHandler);
  
  return router;
};

// Module annotations.
exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/select-account';
exports['@require'] = [
  './handlers/prompt',
  './handlers/select'
];
