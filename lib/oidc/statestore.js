function CeremonyStateStore(store) {
  this._store = store;
}

CeremonyStateStore.prototype.store = function(req, meta, cb) {
  var state = {
    name: 'sso/oidc',
    issuer: meta.issuer,
    tokenURL: meta.tokenURL,
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

CeremonyStateStore.prototype.verify = function(req, h, meta, cb) {
  function loaded(err, state) {
    if (err) { return cb(err); }
    if (!state) { return cb(null, false); }
    
    if (state.name !== 'sso/oidc') {
      return cb(null, false);
    }
    
    // TODO: Destroy the state
    // TODO: Check issuer, remove token URL
    
    if (state.tokenURL !== meta.tokenURL) {
      return cb(null, false);
    }
    if (state.clientID !== meta.clientID) {
      return cb(null, false);
    }
    return cb(null, true, state);
  }
  
  if (req.state && req.state.name == 'sso/oidc') {
    loaded(null, req.state);
  } else {
    this._store.load(req, h, loaded);
  }
}


exports = module.exports = function(s) {
  var store = new CeremonyStateStore(s);
  return store;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/sso/oidc/StateStore';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/www/ceremony/StateStore'
];
