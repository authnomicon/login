exports = module.exports = function(csrfProtection, authenticator, state) {
  
  function select(req, res, next) {
    var s = req.body.selected_session;
    return res.resumeState({ selectedSession: s }, next);
  }
  
  function redirect(req, res, next) {
    res.redirect('/');
  }
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    csrfProtection(),
    state(),
    //authenticate('anonymous'),
    select,
    redirect
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'module:@authnomicon/session.Authenticator',
  'http://i.bixbyjs.org/http/middleware/state'
];
