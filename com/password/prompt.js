var url = require('url');

exports = module.exports = function() {
  
  return function(req, res, next) {
    var q = {};
    if (res.locals.username) { q.username = res.locals.username; }
    
    return res.redirect(url.format({
      pathname: '/login/password',
      query: q
    }));
  };
};

exports['@implements'] = 'module:@authnomicon/prompts.RequestHandler';
exports['@name'] = 'password';
