/**
 * Login prompt.
 *
 * This component provides an HTTP handler that prompts for login.
 */
exports = module.exports = function(loginHandler, authenticate, errorLogging, ceremony) {
  var Request = require('../../../../lib/request')
    , Response = require('../../../../lib/response');
  
  
  function cont(req, res, next) {
    console.log('LOGIN??');
    console.log(req.user);
    console.log(req.state);
    console.log(req.session);
    
    //req.state.foo = 'bar';
    
    // TODO: initialize request with supported challenge types
    var lreq = new Request(req.user)
      , lres = new Response();
    
    lreq.session = req.session;
    
    function ondecision(result, scope) {
      res.redirect('/happy')
    }
    
    function onchallenge(type, options) {
      switch (type) {
      case 'password':
        res.redirect('/login/password');
        break;
      case 'otp':
        res.redirect('/login/otp');
        break;
      case 'oob':
        res.redirect('/login/oob');
        break;
      default:
        return next(new Error('Unsupported login challenge: ' + type));
      }
    }
    
    function onend() {
      lres.removeListener('decision', ondecision);
      lres.removeListener('__challenge__', onchallenge);
    }
    
    lres.once('decision', ondecision);
    lres.once('__challenge__', onchallenge);
    lres.once('end', onend);
    
    loginHandler(lreq, lres);
  }
  
  
  return [
    ceremony(
      authenticate([ 'session', 'anonymous' ]),
      cont
    ),
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    errorLogging()
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/login/LoginHandler',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/errorLogging',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
