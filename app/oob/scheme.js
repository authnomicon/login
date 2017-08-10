exports = module.exports = function(verify) {
  var Strategy = require('passport-oob');
  
  return new Strategy({ passReqToCallback: true }, verify);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'www/oob';
exports['@require'] = [
  './scheme/verify'
];
