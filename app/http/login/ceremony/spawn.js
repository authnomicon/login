/**
 * Spawn login ceremony.
 *
 * This component provides an HTTP handler that spawns a login ceremony.
 */
exports = module.exports = function() {

  // TODO: If no state, and there's a returnTo option, store that
  //       as initial state.

  function redirect(req, res, next) {
    var options = req.locals || {};
    
    req.state.maxAttempts = 3;
    
    switch (options.method) {
    case 'otp':
      return res.redirect('/login/otp');
    default:
      return res.redirect('/login');
    }
  }


  return [
    redirect
  ];
};

exports['@require'] = [];
