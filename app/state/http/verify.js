exports = module.exports = function(realms) {

  return function(user, state, cb) {
    if (!user) { return cb(null, false); }
    return cb(null, user);
  };
};

exports['@require'] = [];
