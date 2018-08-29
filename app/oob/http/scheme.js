exports = module.exports = function(oob, fetch) {
  var Strategy = require('passport-oob');
  
  return new Strategy({ passReqToCallback: true }, oob, fetch);
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'oob';
exports['@require'] = [
  'http://schemas.authnomicon.org/js/cs/oob',
  './scheme/fetch'
];
