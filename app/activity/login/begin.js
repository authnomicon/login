exports = module.exports = function(store) {
  var qs = require('querystring');


  // TODO: If no state, and there's a returnTo option, store that
  //       as initial state.

  function redirect(req, res, next) {
    console.log('#### REDIRECT TO LOGIN');
    console.log(req.locals);
    //return;
    
    
    var options = req.locals || {}
      , state, q;
    
    if (options.methods && options.methods.indexOf('otp') != -1) {
      //return res.redirect('/login/otp');
      return res.redirect('/login/oob');
    }
    
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
