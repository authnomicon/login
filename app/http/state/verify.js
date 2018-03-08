exports = module.exports = function(realms) {

  return function(uid, state, cb){
    console.log('TODO: authnomicon-login, state/scheme/verify - port to realms');
    console.log(uid)
    console.log(state);
    
    //uid = '5001';
    
    if (!uid) { return cb(null, false); }
    
    var subject = { id: uid };
    return cb(null, subject);
    
    
    /*
    if (!uid) { return cb(null, false); }
    Users.get(uid, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
    */
  };
};

exports['@require'] = [];
