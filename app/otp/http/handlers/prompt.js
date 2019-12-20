exports = module.exports = function(csrfProtection, authenticate, ceremony) {
  var path = require('path')
    , ejs = require('ejs');


  function prompt(req, res, next) {
    if (req.user) {
      res.locals.user = req.user;
    }
    res.locals.csrfToken = req.csrfToken();
  
    res.render('login/otp', function(err, str) {
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
    ceremony(
      csrfProtection(),
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
