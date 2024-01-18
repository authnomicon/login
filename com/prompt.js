exports = module.exports = function() {
  
  return function(req, res, next) {
    return res.redirect('/login');
  };
};

exports['@implements'] = 'http://i.authnomicon.org/prompts/http/Prompt';
exports['@name'] = 'login';
