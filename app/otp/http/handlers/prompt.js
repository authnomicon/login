exports = module.exports = function(csrfProtection, authenticate, ceremony) {
  
  return ceremony('login/otp',
    csrfProtection(),
    authenticate('session'),
  function(req, res, next) {
    // FIXME: For some reason req.user will not exist in prompt unless this is here.
    console.log(req.session);
    console.log(req.user)
    return next();
  }
  );
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
