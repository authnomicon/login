/**
 * Password authentication handler.
 *
 * This component provides an HTTP handler that authenticates a username and
 * password.  The credentials are submitted via an HTML form.
 */
exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  
  function establishSession(req, res, next) {
    req.login(req.user, function(err) {
      if (err) { return next(err); }
      // TODO: Pass the info to login as options
      req.session.authInfo = { methods: req.authInfo.methods }
      return next();
    });
  }
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    ceremony(
      authenticate('www-password'),
      [ establishSession ],
    { continue: '/login' })
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
