exports = module.exports = function() {
  
  return function(req, res, next) {
    return res.redirect('/login/select-account');
  };
};

exports['@implements'] = 'module:@authnomicon/prompts.RequestHandler';
exports['@name'] = 'selectAccount';
