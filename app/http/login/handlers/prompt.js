exports = module.exports = function(csrfProtection, authenticate, errorLogging, ceremony) {
  
  return [
    ceremony('login',
      csrfProtection()//,
      //authenticate([ 'session', 'anonymous' ]),
    ),
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    errorLogging()
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/errorLogging',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
