exports = module.exports = function(ceremony, authenticator) {
  var flowstate = require('flowstate');

  return [
    ceremony.loadState('login/oauth2'),
    // NOTE: Running without sessions causes a new login prompt and new oath transaction.  why isn't it the same?
    //authenticator.authenticate('google.com', { session: false, failWithError: true }),
    // TODO: Disable session and localize account
    authenticator.authenticate('google.com', { session: true, failWithError: true }),
    ceremony.complete('login/oauth2'),
    ceremony.completeWithError('login/oauth2')
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/www/ceremony/Dispatcher',
  'http://i.bixbyjs.org/http/Authenticator'
];
