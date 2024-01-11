// Module dependencies.
var path = require('path')
  , ejs = require('ejs');

/**
 * Create password challenge handler.
 *
 * Returns an HTTP handler that challenges the user to autenticate with a
 * username and password.  The challenge is rendered via HTML and the response
 * will be submitted to the `verify` handler via an HTML form.
 *
 * To defend against [login CSRF][1] attacks, this handler initializes a
 * pre-session and includes a CSRF token in the HTML form.  The CSRF token is
 * verified by the `verify` handler.  Consult [Robust Defenses for Cross-Site
 * Request Forgery][2] for a thorough analysis of CSRF, including login CSRF, as
 * well defense mechanisms.
 *
 * [1]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#login-csrf
 * [2]: https://seclab.stanford.edu/websec/csrf/csrf.pdf
 *
 * @openapi
 * /login/password:
 *   get:
 *     summary: Prompt the user to log in using a username and password
 *     responses:
 *       "200":
 *         description: Prompt.
 *         content:
 *           text/html:
 *
 * @param {flowstate.Store} store - Per-request state store.
 * @returns {express.RequestHandler[]}
 */
exports = module.exports = function(store) {
  
  function prompt(req, res, next) {
    if (req.query && req.query.username) {
      res.locals.username = req.query.username;
    }
    res.locals.csrfToken = req.csrfToken();
    
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
