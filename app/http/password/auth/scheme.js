/**
 * Password authentication scheme.
 */
exports = module.exports = function(verify) {
  var Strategy = require('passport-local');
  
  var strategy = new Strategy(verify);
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'password';
exports['@require'] = [
  'http://schemas.authnomicon.org/js/security/authentication/password/verifyFn'
];
