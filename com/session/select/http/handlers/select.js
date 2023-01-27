exports = module.exports = function(authenticator, store) {
  
  function select(req, res, next) {
    var s = req.body.selected_session;
    return res.resumeState({ selectedSession: s }, next);
  }
  
  function redirect(req, res, next) {
    res.redirect('/');
  }
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    //authenticate('anonymous'),
    select,
    redirect
  ];
};

exports['@require'] = [
  'module:@authnomicon/session.Authenticator',
  'module:flowstate.Store'
];
