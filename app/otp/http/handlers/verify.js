exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  var errors = require('http-errors');
  
  
  /*
      function unauthorizedErrorHandler(err, req, res, next) {
        if (err.status !== 401) { return next(err); }
        
        req.state.failureCount = req.state.failureCount ? req.state.failureCount + 1 : 1;
        res.locals.failureCount = req.state.failureCount;
        res.prompt();
        // TODO: Have some maxAttempt limit
      },
  */
  
  // TODO: Clean this up and establish session, with stepped-up method
  function reestablishSession(req, res, next) {
    req.login(req.user, req.authInfo, function(err) {
      if (err) { return next(err); }
      return next();
    });
  }
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    ceremony(
      authenticate('session'),
      authenticate('www-otp-2'),
      [ reestablishSession ],
    { continue: '/login' })
  ];
  
  
  /*
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('login/otp',
      csrfProtection(),
      authenticate('otp'),
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
