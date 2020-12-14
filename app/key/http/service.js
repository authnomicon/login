/**
 * Security key authentication service.
 *
 * @param {Function|Function[]} promptHandler - Prompt handler.
 * @returns {Function}
 */
exports = module.exports = function(promptHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/', promptHandler);
  
  return router;
};

exports['@provides'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/key';
exports['@require'] = [
  './handlers/prompt'
];
