exports = module.exports = function(ceremony, csrfProtection, authenticate, errorLogging) {
  var path = require('path')
    , ejs = require('ejs')
  
  
  function render(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    
    res.render('loginx', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../../password/views/login.ejs');
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
  
  
  return ceremony('login',
    //authenticate([ 'session', 'anonymous' ]),
    csrfProtection(),
    render,
    errorLogging()
  );
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/ceremony',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/errorLogging'
];
