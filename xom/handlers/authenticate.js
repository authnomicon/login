exports = module.exports = function(authenticator, ceremony, stateStore) {
  var errors = require('http-errors');
  
  return [
    ceremony.loadState('login'),
    authenticator.authenticate('local', { failWithError: true }),
    function unauthorizedErrorHandler(err, req, res, next) {
      if (err.status !== 401) { return next(err); }
      
      console.log('HANDLE THE AUTH ERROR...');
      console.log(req.state);
      console.log(req.session.state);
      console.log('---');
      
      var state = req.state || { name: 'login' };
      state.failureCount = state.failureCount ? state.failureCount + 1 : 1;
      
      console.log('CHECK IT');
      console.log(state);
      
      // This allows the
    // ceremony to re-prompt the user for credentials a configurable number of
    // times, redirecting back to the client if and when the limit is exceeded.
      if (state.maxAttempts && state.failureCount >= state.maxAttempts) {
        return next(new errors.Unauthorized('Too many login attempts'));
      }
      
      
      function proceed(ierr, h) {
        if (ierr) { return next(ierr); }
        
        //req.state = state;
        res.locals.state = h;
        res.render('login');
      }
      
      if (req.state) {
        console.log('UPDATE STATE');
        
        stateStore.update(req, req.state.handle, state, proceed);
      } else {
        console.log('SAVE NEW STATE');
        
        if (req.body.state) {
          state.prev = req.body.state;
        }
        stateStore.save(req, state, proceed);
      }
    },
    ceremony.resume('login'),
    ceremony.resumeError('login'),
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/Authenticator',
  'http://i.bixbyjs.org/http/ua/flows/Dispatcher',
  'http://i.bixbyjs.org/http/ua/flows/StateStore'
];
