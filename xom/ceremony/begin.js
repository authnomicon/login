exports = module.exports = function(store) {
  var qs = require('querystring');


  // TODO: If no state, and there's a returnTo option, store that
  //       as initial state.

  function redirect(req, res, next) {
    var options = req.locals || {}
      , optlen = Object.keys(options).length
      , state, q;
    
    if (optlen == 0 || (optlen == 1 && options.state)) {
      q = qs.stringify(options);
      return res.redirect('/login' + (q ? '?' + q : ''));
    }
    
    state = { name: 'login' };
    state.maxAttempts = options.maxAttempts || 3;
    if (options.state) { state.prev = options.state; }
    
    store.save(req, state, function(err, h) {
      q = qs.stringify({ state: h });
      return res.redirect('/login' + (q ? '?' + q : ''));
    });
  }


  return [
    redirect
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/ua/flows/StateStore'
];
