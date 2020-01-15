exports = module.exports = function(OOB, csrfProtection, authenticate, ceremony) {
  var path = require('path')
    , ejs = require('ejs')
    , BindingRequiredError = require('../../../../lib/errors/authenticatorbindingrequired')
  
  
  /*
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
  */
  
  /*
  function selectCredential(req, res, next) {
    var cred = res.locals.credentials[0];
    
    req.locals.cred = cred;
    next();
  }
  */
  
  function challenge(req, res, next) {
    OOB.challenge(req.user, { token: req.session.authInfo.token }, function(err, ticket) {
      if (err) { return next(err); }
      
      req.state.ticket = ticket;
      next();
    });
    
    
    /*
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
    */
  }
  
  function prompt(req, res, next) {
    res.locals.user = req.user;
    res.locals.csrfToken = req.csrfToken();
    
    res.render('login/oob', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/prompt.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  function bindingRequiredErrorHandler(err, req, res, next) {
    if (!(err instanceof BindingRequiredError)) { return next(err); }
    
    res.prompt('credentials/bind', { method: 'oob' })
  }
  
  
  return [
    ceremony(
      csrfProtection(),
      authenticate('session'),
      challenge,
      prompt,
      bindingRequiredErrorHandler
    )
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/credentials/OOBService',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
