/**
 * Password authentication handler.
 *
 * This component provides an HTTP handler that authenticates a username and
 * password.  The credentials are submitted via an HTML form.
 *
 * This handler is protected against CSRF, in order to defend against [login
 * CSRF][1] attacks.  Consult [Robust Defenses for Cross-Site Request
 * Forgery][2] for a thorough analysis of CSRF, including login CSRF, as well
 * defense mechanisms.
 *
 * [1]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#login-csrf
 * [2]: https://seclab.stanford.edu/websec/csrf/csrf.pdf
 */
exports = module.exports = function(parse, csrfProtection, authenticate, state) {
  
  function establishSession(req, res, next) {
    req.login(req.user, req.authInfo, function(err) {
      if (err) { return next(err); }
      // TODO: Consider yeilding state here, for instance an index of the
      // session that was established, for multi login
      return res.resumeState(next);
    });
  }
  
  function go(req, res, next) {
    // TODO: Add an optional service that will be injected here which determines
    // the default application, and how to redirect to it (OpenID IdP init, etc)
    
    res.redirect('/');
  }
  
  
  // TODO: Investigate using a cookie-less CSRF protection mechanism, such
  //       as checking referrer headers, per 
  //       https://seclab.stanford.edu/websec/csrf/csrf.pdf
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    state(),
    authenticate('x-www-password'),
    establishSession,
    go
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/state'
];
