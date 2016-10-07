var clone = require('clone');


function StateStore(store) {
  this._store = store;
}

StateStore.prototype.store = function(req, meta, cb) {
  var state = {
    name: 'login/oauth2',
    authorizationURL: meta.authorizationURL,
    clientID: meta.clientID
  };
  
  // NOTE: Will be (correctly) overridden by the underlying state store with
  //       the handle of the current request state, if any.
  state.prev = (req.query && req.query.state) || (req.body && req.body.state);
  
  this._store.save(req, state, function(err, h) {
    if (err) { return cb(err); }
    return cb(null, h);
  });
}

StateStore.prototype.verify = function(req, h, meta, cb) {
  function loaded(err, state) {
    if (err) { return cb(err); }
    if (!state) { return cb(null, false); }
    
    if (state.name !== 'login/oauth2') {
      // TODO: This should be 403 forbidden, with an error code for logging
      return cb(new Error('State out of sync, expected login/oauth2, got: ' + state.name));
    }
    
    // TODO: Destroy the state
    
    if (state.authorizationURL !== meta.authorizationURL) {
      return cb(null, false);
    }
    if (state.clientID !== meta.clientID) {
      return cb(null, false);
    }
    return cb(null, true, state);
  }
  
  if (req.state && req.state.name == 'login/oauth2') {
    loaded(null, clone(req.state));
  } else {
    this._store.load(req, h, loaded);
  }
}

module.exports = StateStore;
