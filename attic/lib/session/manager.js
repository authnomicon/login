function SessionManager(serialize) {
  this._serialize = serialize;
}

SessionManager.prototype.logIn = function(req, user, info, cb) {
  var self = this;
  this._serialize(user, function(err, obj) {
    if (err) {
      return cb(err);
    }
    if (!req._passport.session) {
      req._passport.session = {};
    }
    req._passport.session.user = obj;
    if (!req.session) {
      req.session = {};
    }
    req.session['passport'] = req._passport.session;
    
    if (req.session && req.session.authInfo) {
      req.session.authInfo.methods = req.session.authInfo.methods.concat(info.methods);
      
      /*
      if (req.authInfo.complete === true) {
        delete req.session.authInfo.complete;
        delete req.session.authInfo.token;
        delete req.session.authInfo.credentials;
      }
      */
    } else {
      req.session.authInfo = info;
    }
    
    
    
    cb();
  });
}

SessionManager.prototype.logOut = function(req, cb) {
  console.log('SESSION MANAGER LOGOUT!');
  // TODO
}


module.exports = SessionManager;
