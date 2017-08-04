exports = module.exports = function(parse, csrfProtection, loadState, authenticate, proceed) {
  
  return [
    parse('application/x-www-form-urlencoded'),
    function(req, res, next) {
      console.log('OTP AUTHENTICATING...');
      console.log(req.body)
      next();
    },
    csrfProtection(),
    //loadState('login'),
    authenticate('www-form/otp'),
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
