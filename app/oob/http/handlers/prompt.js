exports = module.exports = function(authenticators, oob, authenticate, csrfProtection, ceremony) {
  var path = require('path')
    , BindingRequiredError = require('../../../../lib/errors/authenticatorbindingrequired')
  
  
  function initialize(req, res, next) {
    req.locals = req.locals || {};
    next();
  };
  
  function loadAuthenticators(req, res, next) {
    // TODO: Determine user correctly.
    var user = req.user;
    //user = { id: '1' }
    
    authenticators.list(user, function(err, authnrs) {
      if (err) { return next(err); }
      res.locals.authenticators = authnrs;
      
      console.log(err);
      console.log(authnrs);
      
      if (!authnrs || authnrs.length == 0 || authnrs[0].active === false) {
        return next(new BindingRequiredError('MFA binding required'));
      }
      
      next();
    });
  }
  
  function selectAuthenticator(req, res, next) {
    req.locals.authnr = res.locals.authenticators[0];
    req.locals.authnr.channel = req.locals.authnr.channel;
    //req.locals.authnr.channel = req.locals.authnr.channels[0]
    
    /*
    req.state.authenticator = {
      id: req.locals.authnr.id
    };
    */
    
    next();
  }
  
  function challengeAuthenticator(req, res, next) {
    var authnr = req.locals.authnr;
    
    req.state.authenticator = { id: authnr.id }
    
    oob.challenge(authnr, function(err, params) {
      if (err) { return next(err); }
      
      if (typeof params == 'string') {
        params = { ticket: params };
      }
      res.locals.ticket = params.ticket;
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
    loadAuthenticators,
    selectAuthenticator,
    challengeAuthenticator,
    bindingRequiredErrorHandler
  );
};

exports['@require'] = [
  'http://schemas.modulate.io/js/login/AuthenticatorService',
  'http://schemas.authnomicon.org/js/cs/oob',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
