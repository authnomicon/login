exports = module.exports = function(passwords, authenticator, store) {
  
  // TODO: Make this handle a realm parameter, to mirror HTTP Basic auth
  function register(req, res, next) {
    var user = {
      username: req.body.username,
      displayName: req.body.name
    };
    
    passwords.create(user, req.body.password, function(err, user) {
      if (err) { return next(err); }
      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.resumeState(next);
      });
    });
  }
  
  function redirect(req, res, next) {
    res.redirect('/');
  }
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    //authenticator.authenticate('anonymous'),
    authenticator.initialize(),
    register,
    redirect
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/credentials/PasswordService',
  'module:@authnomicon/session.Authenticator',
  'module:flowstate.Store'
];
