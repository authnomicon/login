exports = module.exports = function(authenticators, OOB, csrfProtection) {
  var path = require('path');
  
  
  function initialize(req, res, next) {
    req.locals = req.locals || {};
    next();
  };
  
  function loadAuthenticators(req, res, next) {
    // TODO: Determine user correctly.
    var user = req.user;
    user = { id: '1' }
    
    authenticators.list(user, function(err, authnrs) {
      if (err) { return next(err); }
      res.locals.authnrs = authnrs;
      
      console.log(err);
      console.log(authnrs);
      
      if (!authnrs || authnrs.length == 0 || authnrs[0].active === false) {
        // TODO: Make this a better error.
        res.json({ error: 'enrollment_required' });
        return;
      }
      
      next();
    });
  }
  
  function selectAuthenticator(req, res, next) {
    req.locals.authnr = res.locals.authnrs[0];
    req.locals.authnr.channel = req.locals.authnr.channel;
    //req.locals.authnr.channel = req.locals.authnr.channels[0]
    next();
  }
  
  function challengeAuthenticator(req, res, next) {
    var authnr = req.locals.authnr;
    
    OOB.challenge(authnr, function(err, params) {
      if (err) { return next(err); }
      
      if (typeof params == 'string') {
        params = { ticket: params };
      }
      res.locals.ticket = params.ticket;
      next();
    });
  }
  
  function prompt(req, res, next) {
    res.locals.state = req.query.state;
    res.locals.csrfToken = req.csrfToken();
    
    var view = path.join(__dirname, '../../../views/oob/prompt.ejs');
    res.render(view);
  }
  
  
  return [
    csrfProtection(),
    initialize,
    loadAuthenticators,
    selectAuthenticator,
    challengeAuthenticator,
    prompt
  ];
};

exports['@require'] = [
  'http://schemas.modulate.io/js/login/AuthenticatorService',
  'http://schemas.authnomicon.org/js/security/authentication/oob',
  //'http://schemas.authnomicon.org/js/login/mfa/opt/auth0/UserAuthenticatorsDirectory',
  'http://i.bixbyjs.org/http/middleware/csrfProtection'
];
