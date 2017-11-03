exports = module.exports = function(oob, fetch) {
  var Strategy = require('passport-oob');
  
  return new Strategy({ passReqToCallback: true }, oob, fetch);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'www/oob';
exports['@require'] = [
  'http://schemas.authnomicon.org/js/security/authentication/oob',
  './scheme/fetch'
];
