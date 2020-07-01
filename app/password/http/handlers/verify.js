/**
 * Password authentication handler.
 *
 * This component provides an HTTP handler that authenticates a username and
 * password.  The credentials are submitted via an HTML form.
 *
 * This handler is protected against CSRF, in order to defend against [login
 * CSRF][1] attacks.
 *
 * [1]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#login-csrf
 */
exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  
  function establishSession(req, res, next) {
    req.login(req.user, function(err) {
      if (err) { return next(err); }
      // TODO: Pass the info to login as options
      //req.session.authInfo = { methods: req.authInfo.methods }
      req.session.authInfo = req.authInfo;
      
      return next();
    });
  }
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    ceremony(
      authenticate('www-password'),
      [ establishSession ],
    { continue: '/login' })  // TODO: Remvoe "continue"?
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
