exports = module.exports = function(sd, verify, authenticatorsDir) {

  return function(req, uid, otp, cb) {
    /*
    // TODO: Look up the authenticator service for this user.
    //  user should resolve to service pointer.
    // TODO: bind the connection to the user?
    
    var type = 'otp-enrollments';
    var url = 'https://foo.example.com'
    
    sd.createConnection(type, { url: url }, function() {
      this.list(uid, function(err, authnrs) {
        
      });
      */
      
      /*
      this.verify(username, password, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user);
      });
      */
    //});
    
    //return;
    
    
    var user = { id: '1' }
    var authnr = { algorithm: 'totp' };
    
    //return cb(null, false);
    
    return cb(null, user, authnr)
    
    /*
    function proceed(err, authenticators) {
      var authenticator, type
        , i = 0;
        
      (function iter(err) {
        if (err) { return cb(err); }
        
        authenticator = authenticators[i++];
        if (!authenticator) {
          // Either the one-time password is invalid, or no authenticators
          // support one-time passwords.  The error is intentionally
          // non-specific, in order to avoid leaking details about what
          // authenticators (if any) the user has registered.
          return cb(null, false);
        }
        
        type = authenticator.type;
        if (typeof type == 'string') {
          type = [ type ];
        }
        if (type.indexOf('otp') == -1) {
          return iter();
        }
        
        verify(authenticator, otp, function(err, ok) {
          if (err) { return iter(err); }
          if (!ok) { return iter(); }
          return cb(null, true);
        });
      })();
    }
    
    authenticatorsDir.list(user, proceed);
    */
  };
};

exports['@require'] = [
  'http://i.bixbyjs.org/sd'
  //'http://schemas.authnomicon.org/js/login/mfa/opt/authy/otp/verify',
  //'http://schemas.authnomicon.org/js/login/mfa/opt/authy/UserAuthenticatorsDirectory'
];
