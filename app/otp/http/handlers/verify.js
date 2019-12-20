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
  
  function goHome(req, res, next) {
    delete req.session.authInfo;
    
    next();
    
    //res.redirect('/')
  }
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    ceremony(
    authenticate('session'),
    authenticate('www-otp'),
    goHome
    )
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
