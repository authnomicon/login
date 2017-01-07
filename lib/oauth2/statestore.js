function CeremonyStateStore(store) {
  this._store = store;
}

CeremonyStateStore.prototype.store = function(req, meta, cb) {
  var state = {
    name: 'sso/oauth2',
    authorizationURL: meta.authorizationURL,
    clientID: meta.clientID
  };
  var ps = (req.query && req.query.state) || (req.body && req.body.state);
  if (ps) { state.prev = ps; }
  
  this._store.save(req, state, function(err, h) {
    if (err) { return cb(err); }
    return cb(null, h);
  });
}

CeremonyStateStore.prototype.verify = function(req, h, meta, cb) {
  function loaded(err, state) {
    if (err) { return cb(err); }
    if (!state) { return cb(null, false); }
    
    // TODO: Destroy the state??
    
    if (state.name !== 'sso/oauth2') {
      return cb(null, false);
    }
    if (state.authorizationURL !== meta.authorizationURL) {
      return cb(null, false);
    }
    if (state.clientID !== meta.clientID) {
      return cb(null, false);
    }
    return cb(null, true, state);
  }
  
  if (req.state) {
    loaded(null, req.state);
  } else {
    this._store.load(req, h, loaded);
  }
}




exports = module.exports = function(s) {
  var store = new CeremonyStateStore(s);
  return store;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/sso/oauth2/StateStore';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/www/ceremony/StateStore'
];
