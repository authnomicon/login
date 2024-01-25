// Module dependencies.
var url = require('url');

/**
 * Create login challenge handler.
 *
 * Returns an HTTP handler that challenges the user to autenticate.  The
 * challenge intentionally does not mandate any specific authentication method.
 * Rather, it allows the application to present its preferred initial prompt
 * by providing a "login" view.   The challenge is rendered via HTML and the
 * response will be submitted to a handler for the chosen authentication method.
 *
 * If a "login" view is not provided, this handler will redirect the user to
 * a specific authentication method based on what methods the application
 * supports.  The methods are selected in the following order:
 *
 *   1. Identifer-first:
 *   2. Password:
 *
 * @param {flowstate.Store} store - Per-request state store.
 * @param {electrolyte.Container} C - IoC container used to introspect
 *          application capabilities.
 * @returns {express.RequestHandler[]}
 */
exports = module.exports = function(store, C) {
  
  function prompt(req, res, next) {
    if (req.query && req.query.login_hint) {
      res.locals.loginHint = req.query.login_hint;
    }
    res.locals.csrfToken = req.csrfToken();
    
    res.render('login', function(err, str) {
      if (err && err.view) {
        res.locals.error = err;
        return next();
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  function identifierFirstIfSupported(req, res, next) {
    // TODO: Create a C.has() function to test if an interface exists. (???)
    //.  maybe not, because interface may exist, but not createable if service discovery
    // is in use.  Perhaps add a single-leval `creatable()` function
    
    // TODO: Consider reimplementing this based on introspecting prommpts and
    // then prompting.
    
    C.create('module:@authnomicon/login.IdentifierRouter')
      .then(function() {
        var q = {};
        if (req.query && req.query.login_hint) {
          q.identifier = req.query.login_hint;
        }
        return res.redirect(url.format({ pathname: '/login/identifier', query: q }));
      }, function(error) {
        if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'module:@authnomicon/login.IdentifierRouter') {
          return next();
        }
        return next(error);
      });
  }
  
  function passwordIfSupported(req, res, next) {
    C.create('module:@authnomicon/credentials.PasswordStore')
      .then(function() {
        var q = {};
        if (req.query && req.query.login_hint) {
          q.username = req.query.login_hint;
        }
        return res.redirect(url.format({ pathname: '/login/password', query: q }));
      }, function(error) {
        if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'module:@authnomicon/credentials.PasswordStore') {
          return next();
        }
        return next(error);
      });
  }
  
  function promptError(req, res, next) {
    next(res.locals.error);
  }
  
  
  return [
    require('csurf')(),
    require('flowstate')({ store: store }),
    prompt,
    identifierFirstIfSupported,
    passwordIfSupported,
    promptError
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    //errorLogging()
  ];
};

exports['@require'] = [
  'module:flowstate.Store',
  '!container'
];
