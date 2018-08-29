exports = module.exports = function(authenticators, Authenticators, verify, authenticatorsDir, stateStore) {

  return function(req, token, cb) {
    // TODO: Wrap the state store in a tokens-like interface, so that 
    //      revocation and status checks can be consistent.
    
    console.log('OOB AUTH THIS!');
    console.log(token)
    console.log(req.state);
    
    var authnrID = req.state.credential.id;
    
    authenticators.get(authnrID, function(err, authnr) {
      console.log('GOT AUTHNR');
      console.log(err);
      console.log(authnr);
      
      if (err) { return cb(err); }
      return cb(null, user, authnr);
    });
    
    return;
    
    // TODO: First decode the ticket to get the userID (and authenticator ID?)
    
    var user = { id: '1' }
    
    Authenticators.list(user, function(err, authnrs) {
      console.log(err);
      console.log(authnrs);
      
      var authnr = authnrs[0];
      authnr.channel = authnr.channels[0]
      return cb(null, user, authnr);
    });
    
    /*
    stateStore.load(req, token, function(err, state) {
      if (err) { return cb(err); }
    
    
      console.log('STATE IS!');
      console.log(state);
    
      authenticatorsDir.get(user, state.authenticator, function(err, authenticator) {
        if (err) { return cb(err); }
        // TODO: Error if no authenticator??
      
      
        // TODO: Support for confirmation codes
        //if (body.confirmation_code) {
        //  opts.secret = body.confirmation_code;
        //}
      
        verify(authenticator, state.transaction, function(err, ok) {
          if (err) { return cb(err); }
          if (ok === undefined || ok === false) { // pending or denied
            return cb(null, ok);
          }
        
          // TODO: Add any transaction context to authInfo.
          return cb(null, true);
        });
      });
    });
    */
  };
};

exports['@require'] = [
  'http://schemas.modulate.io/js/login/AuthenticatorService',
  'http://schemas.authnomicon.org/js/login/mfa/opt/auth0/UserAuthenticatorsDirectory',
  
  //'http://schemas.authnomicon.org/js/login/mfa/opt/duo/oob/verify',
  //'http://schemas.authnomicon.org/js/login/mfa/opt/duo/UserAuthenticatorsDirectory',
  //'http://i.bixbyjs.org/http/state/Store'
];
