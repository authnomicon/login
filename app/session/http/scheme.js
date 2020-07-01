exports = module.exports = function(verify) {
  var Strategy = require('../../../lib/session/strategy');
  
  var strategy = new Strategy(function(obj, cb) {
    cb(null, obj);
  });
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'session';
exports['@require'] = [];
