exports = module.exports = function(otp, verify) {
  var Strategy = require('passport-otp');
  
  return new Strategy({ passReqToCallback: true }, otp, verify);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'www-otp';
exports['@require'] = [
  'http://schemas.authnomicon.org/js/security/authentication/otp',
  './scheme/verify'
];
