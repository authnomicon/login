exports = module.exports = function(resume, ceremony, stateStore, authenticator) {
  
  return [
    ceremony.loadState('login'),
    authenticator.authenticate('local', { failWithError: true }),
    resume
  ];
  
};

exports['@require'] = [
  '../ceremony/resume',
  'http://i.bixbyjs.org/www/ceremony/Dispatcher',
  'http://i.bixbyjs.org/www/ceremony/StateStore',
  'http://i.bixbyjs.org/http/Authenticator'
];
