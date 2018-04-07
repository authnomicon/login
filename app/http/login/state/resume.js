exports = module.exports = function(stateStore) {
  var path = require('path')
    , ejs = require('ejs')
    , errors = require('http-errors');


  function unauthorizedErrorHandler(err, req, res, next) {
    if (err.status !== 401) { return next(err); }
    
    req.state.failureCount = req.state.failureCount ? req.state.failureCount + 1 : 1;
    res.locals.message = 'Invalid username or password';
    
    
    // If the maximum number of login attempts has been exceeded, fail.  This
    // allows any initiating ceremony, such as authorization, to resume.
    //
    // Note that, if there was no initiating ceremony, then the user is
    // defaulted into the login ceremony, for which there is no limit on the
    // number of attempts.  The user will continue to see login prompts until
    // he or she succesfully authenticates.  Additional protections, against
    // brute force attacks, are expected to be implemented or injected by the
    // application.
    if (req.state.maxAttempts && state.failureCount >= state.maxAttempts) {
      if (!req.state.parent) { req.state.keep(); }
      return next(new errors.Unauthorized('Too many failed login attempts'));
    } else {
      res.locals.csrfToken = req.csrfToken();
  
      res.render('loginx', function(err, str) {
        if (err && err.view) {
          var view = path.resolve(__dirname, '../../password/views/login.ejs');
          ejs.renderFile(view, res.locals, function(err, str) {
            if (err) { return next(err); }
            res.send(str);
          });
          return;
        } else if (err) {
          return next(err);
        }
        res.send(str);
      });
    }
  }


  return [
    unauthorizedErrorHandler
  ];
};

  // FIXME: Implement this again, when circular dependecny is fixed
  //        (login/task/resume) needs this Dispatcher.
  //        Also, electrolyte needs a test for this in promise based mode.
  //     add, 'http://i.bixbyjs.org/http/state/Dispatcher' to @require, to create a circular
  //     dependency, which triggers a silent crash in current electrolyte (when promises are being used)

exports['@require'] = [
  'http://i.bixbyjs.org/http/state/Store'
];
