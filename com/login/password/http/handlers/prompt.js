/**
 * Password challenge handler.
 *
 * This component provides an HTTP handler that challenges the user to
 * authenticate with a username and password.
 *
 * This handler initializes protection against CSRF, in order to defend against
 * [login CSRF][1] attacks.  Consult [Robust Defenses for Cross-Site Request
 * Forgery][2] for a thorough analysis of CSRF, including login CSRF, as well
 * defense mechanisms.
 *
 * [1]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#login-csrf
 * [2]: https://seclab.stanford.edu/websec/csrf/csrf.pdf
 *
 * @returns {Function[]}
 */
exports = module.exports = function(store) {
  var path = require('path')
    , ejs = require('ejs');
  
  
  function prompt(req, res, next) {
    if (req.query && req.query.username) {
      res.locals.username = req.query && req.query.username;
    }
    res.locals.csrfToken = req.csrfToken();
    
    // NOTE: This will include locals for state.
    res.render('login/password', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/prompt.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  
  return [
    require('csurf')(),
    require('flowstate')({ store: store }),
    prompt
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    //errorLogging()
  ];
};

exports['@require'] = [
  'module:flowstate.Store'
];
