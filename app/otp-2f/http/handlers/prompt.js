/**
 * OTP challenge handler.
 *
 * This component provides an HTTP handler that challenges the user to
 * authenticate with one-time password (OTP).
 *
 * This handler initializes protection against CSRF, in order to defend against
 * [login CSRF][1] attacks.  Consult [Robust Defenses for Cross-Site Request
 * Forgery][2] for a thorough analysis of CSRF, including login CSRF, as well
 * defense mechanisms.
 *
 * [1]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#login-csrf
 * [2]: https://seclab.stanford.edu/websec/csrf/csrf.pdf
 */
exports = module.exports = function(csrfProtection, authenticate, ceremony) {
  var path = require('path')
    , ejs = require('ejs');


  function prompt(req, res, next) {
    res.locals.user = req.user;
    res.locals.csrfToken = req.csrfToken();
  
    res.render('login/otp-2f', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/prompt.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }


  return [
    csrfProtection(),
    ceremony(
      authenticate('session'),
      // TODO: Put session authentication in here
      prompt
    )
  ];
  
  
  /*
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
  */
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
