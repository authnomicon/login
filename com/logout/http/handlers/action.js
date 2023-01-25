exports = module.exports = function(csrfProtection, authenticate, state) {
  
  function logout(req, res, next) {
    // TODO: Check the confirm parameter
    // TODO: Async logout?
    req.logout();
    return res.resumeState(next);
  }
  
  function goHome(req, res, next) {
    res.redirect('/');
  }
  
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    csrfProtection(),
    state(),
    authenticator.authenticate('session'),
    logout,
    goHome
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'module:@authnomicon/session.Authenticator',
  'http://i.bixbyjs.org/http/middleware/state'
];
