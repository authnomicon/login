exports = module.exports = function(parse, csrfProtection, loadState, authenticate, proceed) {
  
  /*
  return [
    require('body-parser').urlencoded({ extended: false }),
    ceremony.loadState('mfa'),
    authenticator.authenticate('session'),
    authenticator.authenticate('mfa-otp'),
    ceremony.complete('mfa'),
    ceremony.completeError('mfa')
  ];
  */
  
  return [
    parse('application/x-www-form-urlencoded'),
    function(req, res, next) {
      console.log('OTP AUTHENTICATING...');
      console.log(req.body)
      next();
    },
    csrfProtection(),
    //loadState('login'),
    authenticate('www/otp'),
    function(req, res, next) {
      console.log('OTP AUTHENTICATED!');
      next();
    },
    proceed
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/loadState',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  '../../activity/login/resume'
];
