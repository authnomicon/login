exports = module.exports = function(cs) {
  
  return function(username, password, realm, cb) {
    if (typeof realm == 'function') {
      cb = realm;
      realm = undefined;
    }
    
    // TODO: resolve the realm, if known
    // TODO: the realm should resolve to a service pointer and domain
    
    cs.verify({ url: 'https://hanson-hq.firebaseio.com', type: 'firebase-password-http'}, username, password, function(err, user) {
      // TODO: Might not always have user object from credential service.
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      
      
      var info = { method: 'password' };
      //info.realm = realm;
      return cb(null, user, info);
    });
  };
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/cs/password'
];
