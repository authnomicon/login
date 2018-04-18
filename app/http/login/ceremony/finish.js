exports = module.exports = function() {
  var uri = require('url')
    , path = require('path')
    , ejs = require('ejs')


  function redirect(req, res, next) {
    console.log('LOGIN FINISH!');
    
    res.redirect('/home')
  }
  
  function unauthorizedErrorHandler(err, req, res, next) {
    if (err.status !== 401) { return next(err); }
    
    // Handles maxAttempts case, where there's nothing to resume to, in which case
    // we want to allow more attempts
    
    
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
  

  return [
    redirect,
    unauthorizedErrorHandler
  ];
};

exports['@require'] = [
  //'./common/prompt'
];
