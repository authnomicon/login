exports = module.exports = function() {

  return function(id, cb) {
    // TODO: Serialize more limited set of data (name, email, etc)
    return cb(null, { id: id });
  };
};

exports['@require'] = [];
