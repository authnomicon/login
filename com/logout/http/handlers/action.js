exports = module.exports = function(parse, csrfProtection, authenticate, state) {
  
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
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    state(),
    authenticate('session'),
    logout,
    goHome
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/state'
];
