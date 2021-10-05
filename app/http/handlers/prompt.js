/**
 * Login prompt.
 *
 * This component provides an HTTP handler that prompts for login.
 */
exports = module.exports = function(csrfProtection, state) {
  
  
  function prompt(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    
    res.render('login', function(err, str) {
      if (err && err.view) {
        return res.redirect('/login/password');
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  
  return [
    csrfProtection(),
    state(),
    prompt
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    //errorLogging()
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/state'
];
