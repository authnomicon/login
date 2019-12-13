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
      return next();
    });
  }
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony(
      csrfProtection(),
      authenticate('www-password', { session: false }),
      [ establishSession ]
    )
  ];
  
  /*
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('login/password',
      csrfProtection(),
      authenticate('password'),
    { through: 'login' })
  ];
  */
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
