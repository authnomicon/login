exports = module.exports = function(/*otp,*/ fetch) {
  var Strategy = require('passport-otp');
  
  return new Strategy({ passReqToCallback: true }, /*otp,*/ fetch);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'www-otp';
exports['@require'] = [
  //'http://schemas.authnomicon.org/js/cs/otp',
  './scheme/fetch'
];
