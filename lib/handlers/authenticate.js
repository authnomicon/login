exports = module.exports = function(proceed, ceremony, authenticator) {
  
  // TODO: Move this file to "password/handlers/authenticate"
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')(),
    ceremony.loadState('login'),
    authenticator.authenticate('local', { failWithError: true }),
    proceed
  ];
  
};

exports['@require'] = [
  '../ceremony/resume',
  'http://i.bixbyjs.org/www/ceremony/Dispatcher',
  'http://i.bixbyjs.org/http/Authenticator'
];
