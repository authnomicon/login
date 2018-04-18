exports = module.exports = function(render, ceremony, csrfProtection, authenticate, errorLogging) {
  
  return [
    ceremony('login',
      csrfProtection(),
      //authenticate([ 'session', 'anonymous' ]),
      render
    ),
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    errorLogging()
  ]
};

exports['@require'] = [
  '../common/render',
  'http://i.bixbyjs.org/http/middleware/ceremony',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/errorLogging'
];
