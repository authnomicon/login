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
 * @param {electrolye.Container} C - IoC container used to introspect
 *          application capabilities.
 * @returns {express.RequestHandler[]}
 */
exports = module.exports = function(store, C) {
  
  function prompt(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    
    res.render('login', function(err, str) {
      if (err && err.view) {
        return next();
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  function redirect(req, res, next) {
    // TODO: Create a C.has() function to test if an interface exists.
    
    C.create('module:@authnomicon/login.IdentifierRouter')
      .then(function() {
        return res.redirect('/login/identifier');
      }, function(error) {
        if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'module:@authnomicon/login.IdentifierRouter') {
          return res.redirect('/login/password');
        }
        return next(error);
      });
  }
  
  
  return [
    require('csurf')(),
    require('flowstate')({ store: store }),
    prompt,
    redirect
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    //errorLogging()
  ];
};

exports['@require'] = [
  'module:flowstate.Store',
  '!container'
];
