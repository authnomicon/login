exports = module.exports = function(store) {
  
  function resumeOr(req, res, next) {
    var s = req.body.select_session;
    return res.resumeState({ select_session: s }, next);
  }
  
  function redirect(req, res, next) {
    res.redirect('/');
  }
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    //authenticate('anonymous'),
    resumeOr,
    redirect
  ];
};

exports['@require'] = [
  'module:@authnomicon/session.Authenticator',
  'module:flowstate.Store'
];
