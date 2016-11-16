exports = module.exports = function(authenticator) {
  
  
  return [
    authenticator.authenticate('local')
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/Authenticator'
];
