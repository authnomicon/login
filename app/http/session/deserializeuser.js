exports = module.exports = function() {

  return function(id, cb) {
    console.log('*** DESERIALIZE USER!');
    console.log(id);
    
    // TODO: Serialize more limited set of data (name, email, etc)
    return cb(null, { id: id });
  };
};

exports['@require'] = [];
