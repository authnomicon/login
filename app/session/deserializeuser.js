exports = module.exports = function(directory) {

  return function(id, cb) {
    directory.find(id, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  };
};

exports['@require'] = [ 'http://i.bixbyjs.org/ds/Directory' ];
