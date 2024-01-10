/**
 * Create password verification handler.
 *
 * Returns an HTTP handler that authenticates the user by verifying a username
 * and password.  The credentials are submitted via an HTML form which was
 * rendered by the `prompt` handler.
 *
 * To defend against [login CSRF][1] attacks, this handler verifies a CSRF
 * token.  Consult [Robust Defenses for Cross-Site Request Forgery][2] for a
 * thorough analysis of CSRF, including login CSRF, as well defense mechanisms.
 *
 * [1]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#login-csrf
 * [2]: https://seclab.stanford.edu/websec/csrf/csrf.pdf
 *
 * @openapi
 * /login/password:
 *   post:
 *     summary: Log in using a username and password
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: number
 *     responses:
 *       "302":
 *         description: Redirect.
 *
 * @param {passport.Strategy} scheme - Authentication scheme that verifies a
 *          username and password submitted via an HTML form.
 * @param {passport.Authenticator} authenticator - Request authenticator.
 * @param {flowstate.Store} store - Per-request state store.
 * @returns {express.RequestHandler[]}
 */
exports = module.exports = function(scheme, authenticator, store) {
  
  function establishSession(req, res, next) {
    // TODO: is login call necessary here?  passport should cover it
    req.login(req.user, req.authInfo, function(err) {
    //req.login(req.user, req.authInfo, function(err, selector) {
      if (err) { return next(err); }
      
      // TODO: Consider yeilding state here, for instance an index of the
      // session that was established, for multi login
      // NOTE: Yes, do that.
      return res.resumeState(next);
      //return res.resumeState({ selectedSession: selector }, next);
    });
  }
  
  // TODO: Move resume state down here to its own middleware, so we can insert change password, etc
  //.   will need the sessionselector of the just logged in user for this.
  
  function go(req, res, next) {
    // TODO: Add an optional service that will be injected here which determines
    // the default application, and how to redirect to it (OpenID IdP init, etc)
    
    res.redirect('/');
  }
  
  
  // TODO: Investigate using a cookie-less CSRF protection mechanism, such
  //       as checking referrer headers, per 
  //       https://seclab.stanford.edu/websec/csrf/csrf.pdf
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    authenticator.authenticate(scheme),
    establishSession,
    go
  ];
};

exports['@require'] = [
  '../scheme',
  'module:passport.Authenticator',
  'module:flowstate.Store'
];
