exports = module.exports = function(resume, ceremony, stateStore, authenticator) {
  
  return [
    ceremony.loadState('login'),
    authenticator.authenticate('local', { failWithError: true }),
    resume
  ];
  
};

exports['@require'] = [
  '../ceremony/resume',
  'http://i.bixbyjs.org/http/ua/flows/Dispatcher',
  'http://i.bixbyjs.org/http/ua/flows/StateStore',
  'http://i.bixbyjs.org/http/Authenticator'
];
