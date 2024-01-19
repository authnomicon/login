exports = module.exports = function() {
  
  return function(req, res, next) {
    return res.redirect('/login/select-account');
  };
};

exports['@implements'] = 'http://i.authnomicon.org/prompts/http/Prompt';
exports['@name'] = 'select-account';
