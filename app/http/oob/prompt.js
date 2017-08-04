exports = module.exports = function(Authenticators, initialize, csrfProtection) {
  var path = require('path');
  
  function loadAuthenticators(req, res, next) {
    // TODO: Determine user correctly.
    var user = req.user;
    user = { id: '1' }
    
    Authenticators.list(user, function(err, authnrs) {
      if (err) { return next(err); }
      res.locals.authnrs = authnrs;
      
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
    next();
  }
  
  function prompt(req, res, next) {
    res.locals.state = req.query.state;
    res.locals.csrfToken = req.csrfToken();
    
    console.log(req.session);
    var view = path.join(__dirname, '../../../views/oob/prompt.ejs');
    console.log(view);
    
    //res.render('loginx');
    res.render(view);
  }
  
  
  return [
    initialize(),
    csrfProtection(),
    loadAuthenticators,
    selectAuthenticator,
    prompt
  ];
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/login/mfa/opt/auth0/UserAuthenticatorsDirectory',
  'http://i.bixbyjs.org/http/middleware/initialize',
  'http://i.bixbyjs.org/http/middleware/csrfProtection'
];
