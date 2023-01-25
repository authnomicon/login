exports = module.exports = function(state) {
  var path = require('path')
    , ejs = require('ejs');


  function prompt(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    
    res.render('account/signup', function(err, str) {
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
  };
  
  
  return [
    require('csurf')(),
    state(),
    prompt
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/state'
];
