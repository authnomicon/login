/**
 * Login service.
 */
exports = module.exports = function(promptHandler, logoutPromptHandler, logoutActionHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/login', promptHandler);
  router.get('/logout', logoutPromptHandler);
  router.post('/logout', logoutActionHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/';
exports['@require'] = [
  './handlers/prompt',
  './handlers/logout/prompt',
  './handlers/logout/action'
];
