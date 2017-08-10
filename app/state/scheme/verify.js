exports = module.exports = function(directory) {

  return function(uid, state, cb){
    uid = '5001';
    
    if (!uid) { return cb(null, false); }
    directory.find(uid, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  };
};

exports['@require'] = [ 'http://i.bixbyjs.org/ds/Directory' ];
