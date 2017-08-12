function SessionManager() {
}

SessionManager.prototype.serializeUser = function(fn) {
  this._serializeUserFunc = fn;
}

SessionManager.prototype.deserializeUser = function(fn) {
  this._deserializeUserFunc = fn;
}

SessionManager.prototype.logIn = function(req, user, cb) {
  console.log('SESSION MANAGER LOGIN!');
  //console.log(req);
  console.log(user);
}


module.exports = SessionManager;
