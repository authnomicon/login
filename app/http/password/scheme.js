exports = module.exports = function(verifyPassword) {
  var Strategy = require('passport-local');
  
  var strategy = new Strategy(verifyPassword);
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'password';
exports['@require'] = [
  'http://schemas.authnomicon.org/js/security/authentication/password/verifyFn'
];
