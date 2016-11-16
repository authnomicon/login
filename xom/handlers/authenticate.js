exports = module.exports = function(authenticator, ceremony, stateStore) {
  var clone = require('clone');
  
  
  return [
    ceremony.loadState('login'),
    authenticator.authenticate('local', { failWithError: true }),
    ceremony.resume('login'),
    function(err, req, res, next) {
      console.log(err);
      if (err.status == 401) { // Unauthorized
        var state = req.state ? clone(req.state) : { name: 'login' };
        state.failureCount = state.failureCount ? state.failureCount + 1 : 1;
        
        function proceed(err, h) {
          if (err) { return next(err); }
          
          req.state = state;
          req.state.handle = h;
          next();
        }
        
        if (req.state) {
          stateStore.update(req, req.state.handle, state, proceed);
        } else {
          if (req.body.state) {
            state.prev = req.body.state;
          }
          
          stateStore.save(req, state, proceed);
        }
        return;
      }
      next(err);
    },
    ceremony.resumeError('login')
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/Authenticator',
  'http://i.bixbyjs.org/http/ua/flows/Dispatcher',
  'http://i.bixbyjs.org/http/ua/flows/StateStore'
];
