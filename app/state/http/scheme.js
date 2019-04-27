/**
 * State authentication scheme.
 */
exports = module.exports = function(verify) {
  var Strategy = require('passport-state');
  
  return new Strategy(verify);
};

exports['@implements'] = 'x-http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'state';
exports['@require'] = [
  './verify'
];
