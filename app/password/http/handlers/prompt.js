exports = module.exports = function(csrfProtection, ceremony) {
  var path = require('path')
    , ejs = require('ejs');
  
  
  function prompt(req, res, next) {
    console.log('PROMPTING LOGIN!!!');
    console.log(req.state)
    
    if (req.user) {
      res.locals.user = req.user;
    }
    res.locals.csrfToken = req.csrfToken();
    
    res.render('login/password', function(err, str) {
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
    ),
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    //errorLogging()
  ];
  
  /*
  return [
    csrfProtection(),
    prompt
  ];
  */
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
