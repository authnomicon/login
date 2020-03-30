/**
 * Password authentication service.
 *
 * This component provides an HTTP service that authenticates an end-user using
 * a username and password.
 *
 * This service is intended to be used by web applications making use of HTML
 * forms to present the end-user with an interactive user interface for logging
 * in to the application.  The interface is rendered by the web browser being
 * used by the end-user.  After authentication, a login session is established,
 * typically using a cookie, allowing the user to continue navigating the
 * application in an authenticated state.
 *
 * It is recommended that desktop and mobile applications make use of web views
 * when presenting login screens to end-users.  This allows the server to
 * dynamically change the sequence of challenges presented to the end-user,
 * enhancing security posture by, for example, prompting for step-up
 * authentication or obtaining consent.  Allowing the server-side to dynamically
 * render login interfaces reduces coupling of authentication requirements to
 * the client application, allowing new challenges to be introduced without
 * deploying software updates to client systems.
 *
 * Despite this recommendation, it is acknowledged that desktop and mobile
 * applications continue to present native login screens, thus creating a tight
 * coupling with the forms of credentials and challenges they are capable of
 * supporting.  Such applications should not make use of this service, but
 * rather use protocols such as HTTP Authentication or SASL.  Additionally use
 * of access tokens within those protocols is encouraged, in order to attenuate
 * privlidges and lifetime of credentials, and avoid persisting long-lived
 * credentials such as passwords.
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
