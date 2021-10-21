exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  
  
  function pending(req, res, next) {
    if (req.authInfo.pending === false) { return next(); }
    res.prompt();
  }
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('login/oob',
      csrfProtection(),
      authenticate('state'),
      authenticate('oob'),
      pending,
    { through: 'login' })
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony',
];
