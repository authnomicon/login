exports = module.exports = function(container) {
  
  return container.create('http://i.authnomicon.org/login/IdentifierRouter')
    .catch(function(err) {
      
      return function(identifier, res, next) {
        // TODO: query encode this
        res.redirect('/login/password?username=' + identifier);
      }
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container'
];
