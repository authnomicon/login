var uri = require('url');

exports = module.exports = function() {
  
  return function(url, returnTo, state) {
    var l = uri.parse(url, true);
    if (returnTo) { l.query.return_to = returnTo; }
    if (state) { l.query.state = state; }
    return uri.format(l);
  };
};

exports['@implements'] = 'module:express.Locals';
exports['@name'] = 'flowURL';
