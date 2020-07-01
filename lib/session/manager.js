function SessionManager(serialize) {
  this._serialize = serialize;
}

SessionManager.prototype.logIn = function(req, user, cb) {
  console.log('SESSION MANAGER LOGIN!');
  //console.log(req);
  console.log(user);
  
  
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
    cb();
  });
}

SessionManager.prototype.logOut = function(req, cb) {
  console.log('SESSION MANAGER LOGOUT!');
}


module.exports = SessionManager;
