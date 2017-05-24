exports = module.exports = function(store) {
  var qs = require('querystring');


  // TODO: If no state, and there's a returnTo option, store that
  //       as initial state.

  function redirect(req, res, next) {
    var options = req.locals || {}
      , state, q;
    
    if (Object.keys(options).length == 0) {
      q = req.state ? '?' + qs.stringify({ state: req.state.handle }) : '';
      return res.redirect('/login' + q);
    }
    
    
    state = { name: 'login' };
    state.maxAttempts = options.maxAttempts || 3;
    if (req.state) { state.parent = req.state.handle; }
    
    store.save(req, state, function(err, h) {
      return res.redirect('/login' + '?' + qs.stringify({ state: h }));
    });
  }


  return [
    redirect
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/workflow/StateStore'
];
