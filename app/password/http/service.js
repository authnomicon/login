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
 * It is recommended that desktop and mobile applications delegate
 * authentication to a sign-in service, making use of web views to allow the
 * service to present login prompts to end-users.  This allows the service to
 * dynamically change the sequence of challenges presented to the end-user,
 * in order to obtain the desired security posture without deploying software
 * updates to end-user systems.  This technique also avoids exposing the
 * end-user's credentials to the application.  The sign-in service would
 * implement a protocol such as OpenID Connect, and make use of this password
 * authentication service as one of its prompts.
 *
 * Despite this recommendation, it is acknowledged that desktop and mobile
 * applications continue to present native login screens, directly handling end-
 * user credentials and thus creating a tight coupling between the challenges
 * supported and the attainable security posture.  Such applications do not
 * delegate to a sign-in service and should not make use of this service.
 * Instead, applications are encouraged to make use of the the [HTTP
 * Authentication][1] framework, perhaps in conjuction with the [OAuth 2.0][2]
 * authorization framework and end-user credentials as authorization grants.
 *
 * [1]: https://tools.ietf.org/html/rfc7235
 * [2]: https://tools.ietf.org/html/rfc6749
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
