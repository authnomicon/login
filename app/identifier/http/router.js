exports = module.exports = function() {
  
  // http://i.authnomicon.org/login/IdentifierRouter
  
  return function(identifier, res, next) {
    console.log('route the resposne');
    console.log(identifier)
    
    // TODO: query encode this
    res.redirect('/login/password?username=' + identifier);
  }
};

exports['@singleton'] = true;
exports['@require'] = [
];
