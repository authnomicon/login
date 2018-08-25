/**
 * Password authentication scheme.
 *
 * This component provides an HTTP authentication scheme that authenticates an
 * end-user using a username and password.
 *
 * This authentication scheme is intended to be used by web applications using
 * HTML forms (as opposed to user agents using headers defined by the HTTP
 * Authentication framework).
 */
exports = module.exports = function(password) {
  var Strategy = require('passport-local');
  
  var strategy = new Strategy(password.verify);
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'password';
exports['@require'] = [
  'http://schemas.authnomicon.org/js/cs/password'
];
