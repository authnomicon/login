exports = module.exports = function(parse, ceremony, csrfProtection, authenticate) {
  
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
    ceremony('authenticate-otp',
      function(req, res, next) {
        console.log('OTP AUTHENTICATING...');
        console.log(req.body)
        next();
      },
      csrfProtection(),
      //loadState('login'),
      authenticate('otp'),
      function(req, res, next) {
        console.log('OTP AUTHENTICATED!');
        next();
      },
    { through: 'login' })
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/ceremony',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate'
];
