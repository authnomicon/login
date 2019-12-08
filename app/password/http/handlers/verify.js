/**
 * Password authentication handler.
 *
 * This component provides an HTTP handler that authenticates a username and
 * password.  The credentials are submitted via an HTML form.
 */
exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  
  function logIt(req, res, next) {
    //console.log('GO HOME');
    //console.log(req.query);
    //console.log(req.body);
    //console.log(req.state);
    next()
  }
  
  function estSession(req, res, next) {
    console.log('EST SESSION!');
    console.log(req.user)
    
    req.login(req.user, function(err) {
      if (err) { return next(err); }
      return next();
    });
  }
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    //ceremony('login/password',
    ceremony(
      logIt,
      csrfProtection(),
      authenticate('www-password', { session: false }),
      estSession
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
