/**
 * Login prompt.
 *
 * This component provides an HTTP handler that prompts for login.
 */
exports = module.exports = function(state, C) {
  
  
  function prompt(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    
    res.render('login', function(err, str) {
      if (err && err.view) {
        return next();
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  function redirect(req, res, next) {
    C.create('http://i.authnomicon.org/login/IdentifierRouter')
      .then(function() {
        return res.redirect('/login/identifier');
      }, function(error) {
        if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'http://i.authnomicon.org/login/IdentifierRouter') {
          return res.redirect('/login/password');
        }
        return next(error);
      });
  }
  
  
  return [
    require('csurf')(),
    state(),
    prompt,
    redirect
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    //errorLogging()
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/state',
  '!container'
];
