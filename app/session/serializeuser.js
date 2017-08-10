exports = module.exports = function(directory) {

  return function(user, cb) {
    return cb(null, user.id);
  };
};

exports['@require'] = [ 'http://i.bixbyjs.org/ds/Directory' ];
