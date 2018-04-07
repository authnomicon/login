exports = module.exports = function(render, ceremony, csrfProtection, authenticate, errorLogging) {
  
  return [
    ceremony('login',
      csrfProtection(),
      //authenticate([ 'session', 'anonymous' ]),
      render
    ),
    errorLogging()
  ]
};

exports['@require'] = [
  '../include/render', 
  'http://i.bixbyjs.org/http/middleware/ceremony',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/errorLogging'
];
