/**
 * Public key authentication handler.
 */
exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  
  function establishSession(req, res, next) {
    req.login(req.user, req.authInfo, function(err) {
      if (err) { return next(err); }
      return next();
    });
  }
  
  
  // TODO: Investigate using a cookie-less CSRF protection mechanism, such
  //       as checking referrer headers, per 
  //       https://seclab.stanford.edu/websec/csrf/csrf.pdf
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    ceremony(
      authenticate('x-www-publickey'),
      [ establishSession ]
    )
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
