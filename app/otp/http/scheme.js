exports = module.exports = function(otp, fetch) {
  var Strategy = require('passport-otp');
  
  return new Strategy({ passReqToCallback: true }, otp, fetch);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'otp';
exports['@require'] = [
  'http://schemas.authnomicon.org/js/security/authentication/otp',
  './scheme/fetch'
];