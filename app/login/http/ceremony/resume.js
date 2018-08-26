/**
 * Resume login ceremony.
 *
 * This component provides a middleware stack that resumes a login ceremony.
 */
exports = module.exports = function() {
  var errors = require('http-errors');


  function establishSession(req, res, next) {
    req.login(req.user, function(err) {
      if (err) { return next(err); }
      next();
    });
  }

  function unauthorizedErrorHandler(err, req, res, next) {
    if (err.status !== 401) { return next(err); }
    
    req.state.failureCount = req.state.failureCount ? req.state.failureCount + 1 : 1;
    // TODO: Preserve the error message, if there is one
    res.locals.message = 'Invalid username or password';
    res.locals.failureCount = req.state.failureCount;
    
    // If the maximum number of login attempts has been exceeded, fail.  This
    // allows any initiating ceremony, such as authorization, to resume.
    //
    // Note that, if there was no initiating ceremony, then the user is
    // defaulted into the login ceremony, for which there is no limit on the
    // number of attempts.  The user will continue to see login prompts until
    // he or she succesfully authenticates.  Additional protections, against
    // brute force attacks, are expected to be implemented or injected by the
    // application.
    if (req.state.parent && req.state.maxAttempts && req.state.failureCount >= req.state.maxAttempts) {
      return next(new errors.Unauthorized('Too many failed login attempts'));
    } else {
      res.prompt();
    }
  }


  return [
    establishSession,
    function(req, res, next) {
      if (req.yieldState && req.yieldState.name == 'login/password') {
        //res.prompt('login', { method: 'oob' })
        //return;
      }
      
      next();
    },
    unauthorizedErrorHandler
  ];
};

  // FIXME: Implement this again, when circular dependecny is fixed
  //        (login/task/resume) needs this Dispatcher.
  //        Also, electrolyte needs a test for this in promise based mode.
  //     add, 'http://i.bixbyjs.org/http/state/Dispatcher' to @require, to create a circular
  //     dependency, which triggers a silent crash in current electrolyte (when promises are being used)

exports['@require'] = [];
