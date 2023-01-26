exports = module.exports = function(state) {
  var path = require('path')
    , ejs = require('ejs');
  
  
  function prompt(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    
    // NOTE: This will include locals for state.
    res.render('login/identifier', function(err, str) {
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
    require('csurf')(),
    state(),
    prompt
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    //errorLogging()
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/state'
];
