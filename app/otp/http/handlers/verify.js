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
  function goHome(req, res, next) {
    // TODO: Pass the info to login as options.
    if (req.authInfo && req.session && req.session.authInfo) {
      req.session.authInfo.methods = req.session.authInfo.methods.concat(req.authInfo.methods);
    }
    
    //delete req.session.authInfo;
    
    next();
    
    //res.redirect('/')
  }
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    ceremony(
      authenticate('session'),
      authenticate('www-otp'),
      goHome,
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
