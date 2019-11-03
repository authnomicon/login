exports = module.exports = function(cs, ds) {
  
  return function(username, password, realm, cb) {
    if (typeof realm == 'function') {
      cb = realm;
      realm = undefined;
    }
    
    // TODO: resolve the realm, if known.  actually, pass it down, and resolve it to
    //       a service inside cs and 
    // TODO: the realm should resolve to a service pointer and domain
    
    cs.verify(username, password, function(err, user) {
      // TODO: Might not always have user object from credential service.
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      
      
      //return cb(null, user);
      console.log('LOOK UP IN DIRECTORY!');
      console.log(user);
      //return;
      
      // TODO: optimize directory lookup, if cs doesn't return user.
      
      ds.get(user.id, function(err, user) {
        console.log(err);
        console.log(user);
        
        return cb(null, user);
      })
      
      return;
      
      
      
      var info = { method: 'password' };
      //info.realm = realm;
      return cb(null, user, info);
    });
  };
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/cs/password',
  'http://schemas.authnomicon.org/js/ds'
];
