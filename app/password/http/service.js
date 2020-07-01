/**
 * Password authentication service.
 *
 * This component provides an HTTP service that authenticates an end-user using
 * a username and password.
 *
 * This service is intended to be used by web applications where HTML forms are
 * used to present the end-user with an interactive interface for logging in to
 * the application.  The interface is rendered by the web browser being used by
 * the end-user.  After authentication, a login session is established, allowing
 * the user to continue navigating the application in an authenticated state.
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
exports['@path'] = '/login/password';
exports['@require'] = [
  './handlers/prompt',
  './handlers/verify'
];
