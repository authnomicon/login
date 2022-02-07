exports = module.exports = function() {
  
  return function(req, res, next) {
    return res.redirect('/login');
    
    // TODO: Port these prompts over
    /*
    // TODO: look up a service to handle the prompt (OIDC for login, etc)
    switch (name) {
    case 'login':
      return res.redirect('/login');
    case 'otp-2f':
      return res.redirect('/login/otp-2f');
    case 'publickey':
      return res.redirect('/login/publickey');
    default:
      return next(new Error('Unsupported login challenge: ' + name));
    }
    */
    
    //req.locals = req.locals || {};
    //next();
  };
};

exports['@implements'] = 'http://i.authnomicon.org/prompts/http/Prompt';
exports['@name'] = 'login';
