// Module dependencies.
var express = require('express');

/**
 * Create password authentication service.
 *
 * Returns an HTTP service that authenticates a user using a username and
 * password.
 *
 * This service will establish (or step up) a login session which is maintained
 * between the browser and server using a cookie.  The interface is expected to
 * be rendered via HTML and the results of interaction submitted via an HTML
 * form.
 *
 * These expectactions are well-suited for web applications running on the same
 * origin.  Web applications that run on a different origin and native
 * applications that lack the concept of an origin are advised to use an
 * alternative service that provides authentication capabilities.  Such service
 * is beyond the scope of this package, but developers are encouraged to adopt
 * suitable standardized protocols such as OpenID Connect and OAuth 2.0.
 *
 * @param {express.Handler} promptHandler - Handler which prompts the user to
 *          authenticate by rendering an HTML page.
 * @param {express.Handler} verifyHandler - Handler which verifies the user's
 *          credentials submitted via an HTML form.
 * @returns {express.Router}
 */
exports = module.exports = function(promptHandler, verifyHandler) {
  var router = express.Router();
  router.get('/', promptHandler);
  router.post('/', verifyHandler);
  
  return router;
};

// Module annotations.
exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/password';
exports['@require'] = [
  './handlers/prompt',
  './handlers/verify'
];
