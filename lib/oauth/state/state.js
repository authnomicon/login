var uri = require('url');
var clone = require('clone');

var MAGIC = 'oa1';


function StateStore(store) {
  this._store = store;
}

StateStore.prototype.get = function(req, token, meta, cb) {
  function loaded(err, state) {
    if (err) { return cb(err); }
    if (!state) { return cb(null, false); }
    
    if (state.name !== 'login/oauth') {
      // TODO: This should be 403 forbidden, with an error code for logging
      return cb(new Error('State out of sync, expected login/oauth, got: ' + state.name));
    }
    
    if (state.authorizationURL !== meta.userAuthorizationURL) {
      return cb(null, false);
    }
    if (state.consumerKey !== meta.consumerKey) {
      return cb(null, false);
    }
    
    var tokenSecret = state.tokenSecret;
    delete state.tokenSecret;
    
    return cb(null, tokenSecret, state);
  }
  
  
  if (req.state && req.state.name == 'login/oauth') {
    loaded(null, clone(req.state));
  } else {
    var url = uri.parse(meta.userAuthorizationURL);
    var h = [ MAGIC, url.hostname, token ].join('_');
    this._store.load(req, h, loaded);
  }
}

StateStore.prototype.set = function(req, token, tokenSecret, meta, cb) {
  var url = uri.parse(meta.userAuthorizationURL);
  var h = [ MAGIC, url.hostname, token ].join('_');
  
  var state = {
    name: 'login/oauth',
    authorizationURL: meta.userAuthorizationURL,
    consumerKey: meta.consumerKey,
    tokenSecret: tokenSecret
  };
  
  // NOTE: Will be (correctly) overridden by the underlying state store with
  //       the handle of the current request state, if any.
  state.prev = (req.query && req.query.state) || (req.body && req.body.state);
  
  this._store.save(req, state, { h: h }, function(err, h) {
    if (err) { return cb(err); }
    return cb(null);
  });
}

StateStore.prototype.destroy = function(req, token, meta, cb) {
  var url = uri.parse(meta.userAuthorizationURL);
  var h = [ MAGIC, url.hostname, token ].join('_');
  
  this._store.destroy(req, h, function(err) {
    if (err) { return cb(err); }
    return cb(null);
  });
}

module.exports = StateStore;
