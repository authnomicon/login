/**
 * Public key authentication service.
 *
 * @param {Function|Function[]} promptHandler - Prompt handler.
 * @param {Function|Function[]} verifyHandler - Verify handler.
 * @returns {Function}
 */
exports = module.exports = function(promptHandler, verifyHandler) {
  var express = require('express');
  
  var router = new express.Router();
  router.get('/', promptHandler);
  router.post('/', verifyHandler);
  
  return router;
};

exports['@provides'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/publickey';
exports['@require'] = [
  './handlers/prompt',
  './handlers/verify'
];
