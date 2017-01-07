exports = module.exports = function() {
  var MAGIC = 'oauth';
  
  return function(host, token) {
    return [ MAGIC, host, token ].join('_');
  };
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/sso/oauth/toStateHandle';
exports['@singleton'] = true;
