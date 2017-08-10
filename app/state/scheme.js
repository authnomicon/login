exports = module.exports = function(verify) {
  var Strategy = require('passport-state');
  
  return new Strategy(verify);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'www/state';
exports['@require'] = [
  './scheme/verify'
];
