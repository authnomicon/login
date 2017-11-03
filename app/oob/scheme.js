exports = module.exports = function(fetch) {
  var Strategy = require('passport-oob');
  
  return new Strategy({ passReqToCallback: true }, fetch);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'www/oob';
exports['@require'] = [
  './scheme/fetch'
];
