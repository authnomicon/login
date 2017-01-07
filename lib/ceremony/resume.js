exports = module.exports = function(ceremony, stateStore) {
  var errors = require('http-errors')
    , RepromptError = require('../../lib/errors/reprompterror');


  return [
    function unauthorizedErrorHandler(err, req, res, next) {
      if (err.status !== 401) { return next(err); }
      
      var state = req.state || { name: 'login' };
      state.failureCount = state.failureCount ? state.failureCount + 1 : 1;
      
      // If the maximum number of login attempts has been exceeded, fail.  This
      // allows any initiating ceremony, such as authorization, to resume.
      //
      // Note that, if there was no initiating ceremony, then the user is
      // defaulted into the login ceremony, for which there is no limit on the
      // number of attempts.  The user will continue to see login prompts until
      // he or she succesfully authenticates.  Additional protections, against
      // brute force attacks, are expected to be implemented or injected by the
      // application.
      if (state.maxAttempts && state.failureCount >= state.maxAttempts) {
        return next(new errors.Unauthorized('Too many failed login attempts'));
      }
      
      return next(new RepromptError(state));
    },
    function repromptErrorHandler(err, req, res, next) {
      if (!(err instanceof RepromptError)) { return next(err); }
      
      function proceed(ierr, h) {
        if (ierr) { return next(ierr); }
        
        res.locals.state = h;
        res.render('login');
        return;
      }
      
      if (req.state) {
        stateStore.update(req, req.state.handle, err.state, proceed);
      } else {
        if (req.body.state) {
          err.state.prev = req.body.state;
        }
        stateStore.save(req, err.state, proceed);
      }
    },
    ceremony.complete('login'),
    ceremony.completeWithError('login')
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/www/ceremony/Dispatcher',
  'http://i.bixbyjs.org/www/ceremony/StateStore'
];
