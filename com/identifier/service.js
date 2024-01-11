// Module dependencies.
var express = require('express');

/**
 * Create identifier-first authentication service.
 *
 * Returns an HTTP service that challenges a user to authenticate with a method
 * that varies on the user's identifier.
 *
 * This service will prompt the user enter their identifer (username, email
 * address, phone number, etc).  Based on the identifier, the user will be
 * challenged to authenticate with the appropriate method.  The interface is
 * expected to be rendered via HTML and the results of interaction submitted via
 * an HTML form.
 *
 * This service is often used when authenticating users who authenticate with a
 * corporate or organizational identity provider (IDP).  In such cases, a user
 * typically enters their email address and is routed to the corresponding IDP
 * for the domain.  This allows for single sign-on (SSO) and centralized access
 * management.
 *
 * @param {express.RequestHandler} promptHandler - Handler which prompts the
 *          user to enter their identifier.
 * @param {express.RequestHandler} routeHandler - Handler which routes the user
 *          to an authentication challenge based on the user's identifier.
 * @returns {express.Router}
 */
exports = module.exports = function(promptHandler, routeHandler) {
  var router = new express.Router();
  router.get('/', promptHandler);
  router.post('/', routeHandler);
  
  return router;
};

// Module annotations.
exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login/identifier';
exports['@require'] = [
  './handlers/prompt',
  './handlers/route'
];
