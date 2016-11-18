exports = module.exports = function(s) {
  var MAGIC = 'oauth';
  
  return function(host, token) {
    return [ MAGIC, host, token ].join('_');
  };
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/aaa/login/oauth/getStateHandle';
exports['@singleton'] = true;
