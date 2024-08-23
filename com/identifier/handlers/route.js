// Module dependencies.
var merge = require('utils-merge');

/**
 * Create identifier routing handler.
 *
 * Returns an HTTP handler that challenges the user to authenticate with a
 * method that varies on the user's identifier.  The identifier is submitted via
 * an HTML form which was rendered by the `prompt` handler.
 *
 * @param {@authnomicon/prompts.Router} prompts - Router which dispatches
 *          authentication challenge to web-based prompt.
 * @param {@authnomicon/login.IdentifierRouter} router - Router which challenges
 *          for authentication method based on identifier.
 * @param {flowstate.Store} store - Per-request state store.
 * @returns {express.RequestHandler[]}
 */
exports = module.exports = function(prompts, router, store) {
  
  function route(req, res, next) {
    router(req.body.identifier, function(err, prompt, options) {
      if (err) { return next(err); }
      
      if (options) {
        merge(res.locals, options);
      }
      prompts.dispatch(prompt, req, res, next);
    });
  }
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    route
    // TODO: add a default handler here which errors with "not routable" or to a default page
  ];
};

exports['@require'] = [
  'module:@authnomicon/prompts.Router',
  'module:@authnomicon/login.IdentifierRouter',
  'module:flowstate.Store'
];
