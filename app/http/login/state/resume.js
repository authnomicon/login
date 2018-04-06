exports = module.exports = function(stateStore) {
  var path = require('path')
    , ejs = require('ejs')
    , errors = require('http-errors')
    , RepromptError = require('../../../../lib/errors/reprompterror');


  return [
    function dump(req, res, next) {
      console.log('RESUME: login');
      console.log(req.body)
      console.log(req.state);
      
      //console.log('RESUMING LOGIN ACTIVITY...');
      //console.log(req.state)
      //console.log(req.yieldState)
      //return;
      next();
    },
    function unauthorizedErrorHandler(err, req, res, next) {
      if (err.status !== 401) { return next(err); }
      
      console.log('UNAUTHORIZED!');
      console.log(req.state);
      
      
      //var state = req.state || { name: 'login' };
      req.state.failureCount = req.state.failureCount ? req.state.failureCount + 1 : 1;
      
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
        return next(new errors.Unauthorized('Too many failed login attempts'));
      } else {
        console.log('RERENDER!!!!')
        console.log(req.yieldState);
        console.log(err);
        console.log(req.authInfo);
        
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
      
      //return next(new RepromptError(state));
    },
    function repromptErrorHandler(err, req, res, next) {
      next(err);
      
      //if (!(err instanceof RepromptError)) { return next(err); }
      
      
      /*
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
      */
    },
    function finished(req, res, next) {
      console.log('FINISHED!');
      //console.log(res.finishedTask)
      next();
      
      //res.completePrompt(next);
    },
    function finishedError(err, req, res, next) {
      //console.log('FINISHED!');
      //console.log(res.finishedTask)
      next(err)
      
      //res.completePrompt(err, next);
    },
    /*
    function(req, res, next) {
      //console.log('DEFAULT BEHAVIOR, TODO!');
      //console.log(req.state)
      //console.log(req.session.state);
      
      //res.redirect('/home');
    },
    function(err, req, res, next) {
      //console.log('DEFAULT ERROR BEHAVIOR, TODO!');
      //console.log(err);
      //console.log(req.state)
      //console.log(req.session.state);
      
      //res.locals.state = res.locals.state || req.query.state;
      //res.render('login');
    }
    */
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
