exports = module.exports = function() {

  return function(user, cb) {
    // TODO: Serialize set of commonly needed properties
    return cb(null, user.id);
  };
};

exports['@require'] = [];
