exports = module.exports = function(verifyPassword) {
  var Strategy = require('passport-local');
  
  var strategy = new Strategy(verifyPassword);
  return strategy;
};

// TODO: Set this name to www/password
exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@require'] = [
  // TODO: Rename this interface to verify
  'http://i.bixbyjs.org/security/authentication/password/authenticate'
];
