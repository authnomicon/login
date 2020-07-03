/**
 * OTP authentication service.
 *
 * This component provides an HTTP service that authenticates an end-user using
 * a one-time password (OTP).
 *
 * This service is intended to be used by sites making use of HTML forms to
 * present the end-user with an interface for logging in to the site.  The
 * interface is rendered by the web browser being used by the end-user.  After
 * authentication, the login session is stepped up to indicate the additional
 * factor of authentication.
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

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/otp-2';
exports['@require'] = [
  './handlers/prompt',
  './handlers/verify'
];
