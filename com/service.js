// Module dependencies.
var express = require('express');

/**
 * Create authentication service.
 *
 * Returns an HTTP service that challenges a user to authenticate.  The
 * challenge intentionally does not mandate any specific authentication method.
 * Rather, it allows the application to present its preferred initial prompt.
 *
 * If the application supports multiple authentication methods, this initial
 * prompt can present multiple methods.  This, in turn, allows the user to
 * select their preferred authentication method.
 *
 * @param {express.RequestHandler} promptHandler - Handler which prompts the
 *          user to log in.
 * @returns {express.Router}
 */
exports = module.exports = function(promptHandler) {
  var router = express.Router();
  router.get('/', promptHandler);
  
  return router;
};

// Module annotations.
exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/login';
exports['@require'] = [
  './handlers/prompt'
];
