exports = module.exports = function(getStateHandle, ceremony, authenticator) {
  var flowstate = require('flowstate');

  function getHandle(req) {
    // FIXME: causes loadState middleware error, because state is undefined
    //return 'foo';
    
    return getStateHandle(req.params.host, req.query.oauth_token);
  }


  return [
    ceremony.loadState({ name: 'login/oauth', getHandle: getHandle }),
    // NOTE: Running without sessions causes a new login prompt and new oath transaction.  why isn't it the same?
    //authenticator.authenticate('google.com', { session: false, failWithError: true }),
    // TODO: Disable session and localize account
    authenticator.authenticate('twitter.com', { session: true, failWithError: true }),
    ceremony.complete('login/oauth'),
    ceremony.completeWithError('login/oauth')
  ];
  
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/aaa/login/oauth/getStateHandle',
  'http://i.bixbyjs.org/http/ua/flows/Dispatcher',
  'http://i.bixbyjs.org/http/Authenticator'
];
