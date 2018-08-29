exports = module.exports = function(credentials, oob, csrfProtection, authenticate, ceremony) {
  var path = require('path')
    , BindingRequiredError = require('../../../../lib/errors/authenticatorbindingrequired')
  
  
  function initialize(req, res, next) {
    req.locals = req.locals || {};
    next();
  };
  
  function retrieveCredentials(req, res, next) {
    credentials.list(req.user, function(err, creds) {
      if (err) { return next(err); }
      res.locals.credentials = creds;
      
      if (!creds || creds.length == 0 || creds[0].active === false) {
        return next(new BindingRequiredError('MFA binding required'));
      }
      
      next();
    });
  }
  
  function selectCredential(req, res, next) {
    var cred = res.locals.credentials[0];
    
    req.locals.cred = cred;
    next();
  }
  
  function challenge(req, res, next) {
    var cred = req.locals.cred;
    
    oob.challenge(cred, function(err, params) {
      if (err) { return next(err); }
      if (typeof params == 'string') {
        params = { ticket: params };
      }
      
      req.state.user = req.user;
      req.state.credential = {
        id: cred.id
      };
      req.state.ticket = params.ticket;
      next();
    });
  }
  
  function bindingRequiredErrorHandler(err, req, res, next) {
    if (!(err instanceof BindingRequiredError)) { return next(err); }
    
    res.prompt('credentials/bind', { method: 'oob' })
  }
  
  
  return ceremony('login/oob',
    csrfProtection(),
    authenticate('session'),
    initialize,
    retrieveCredentials,
    selectCredential,
    challenge,
    bindingRequiredErrorHandler
  );
};

exports['@require'] = [
  'http://schemas.modulate.io/js/login/AuthenticatorService',
  'http://schemas.authnomicon.org/js/cs/oob',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
