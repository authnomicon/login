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
    authenticate('session'),
    logout,
    goHome
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/state'
];
