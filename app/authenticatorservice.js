exports = module.exports = function(IoC, logger) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var components = IoC.components('http://schemas.modulate.io/js/login/AuthenticatorServiceProvider');
      return Promise.all(components.map(function(c) { return c.create(); } ))
        .then(function(providers) {
          providers.forEach(function(provider, i) {
            logger.info('Loaded authenticators service provider: ' + components[i].a['@name']);
            factory.use(provider);
          });
        })
        .then(function() {
          return factory;
        });
    })
    .then(function(factory) {
      // TODO: perform service discovery for this.
      var url = 'http://foo'
      
      return factory.create(url);
    });
}

exports['@singleton'] = true;
exports['@implements'] = 'http://schemas.modulate.io/js/login/AuthenticatorService';
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
