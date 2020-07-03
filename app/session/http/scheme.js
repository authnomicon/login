exports = module.exports = function() {
  var Strategy = require('../../../lib/session/strategy');
  
  return new Strategy(function(obj, cb) {
    cb(null, obj);
  });
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'session';
exports['@require'] = [];
