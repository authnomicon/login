exports = module.exports = function(verify) {
  var Strategy = require('passport-otp');
  
  return new Strategy({ passReqToCallback: true }, verify);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'www-form/otp';
exports['@require'] = [
  './scheme/verify'
];
