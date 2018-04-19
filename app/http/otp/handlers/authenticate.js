exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  var errors = require('http-errors');
var path = require('path')
  , ejs = require('ejs');

  
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('login/otp',
      csrfProtection(),
      //authenticate('otp'),
      function(req, res, next) {
        if (req.body.otp == '123') {
          req.user = { id: '1', displayName: 'joe'}
          return next();
        }
        
        return next(new errors.Unauthorized('Invalid otp'));
      },
      function unauthorizedErrorHandler(err, req, res, next) {
        if (err.status !== 401) { return next(err); }
        
        req.state.failureCount = req.state.failureCount ? req.state.failureCount + 1 : 1;
        res.locals.failureCount = req.state.failureCount;
        res.prompt();
        
        // TODO: Have some maxAttempt limit
      },
    { through: 'login' })
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
