exports = module.exports = function(container) {
  
  // http://i.authnomicon.org/login/IdentifierRouter
  
  return container.create('http://i.authnomicon.org/login/IdentifierRouter')
    .catch(function(err) {
      console.log('!!!(())');
      //console.log(err);
      
      return function(identifier, res, next) {
        console.log('route the resposne');
        console.log(identifier)
    
        // TODO: query encode this
        res.redirect('/login/password?username=' + identifier);
      }
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container'
];
