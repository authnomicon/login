exports = module.exports = function(csrfProtection, authenticate, state, session) {
  var path = require('path')
    , ejs = require('ejs')
    , merge = require('utils-merge');


  function prompt(req, res, next) {
    var users = req.user;
    if (!Array.isArray(users)) {
      users = [ users ];
    }
    var infos = req.authInfo;
    if (!Array.isArray(infos)) {
      infos = [ infos ];
    }
    
    var accounts = []
      , i;
    for (i = 0; i < users.length; ++i) {
      accounts.push(merge({}, users[i]));
      accounts[i].sessionSelector = infos[i].sessionSelector;
    }
    
    res.locals.csrfToken = req.csrfToken();
    res.locals.accounts = accounts;
    
    res.render('account/select', function(err, str) {
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
    session(),
    csrfProtection(),
    state(),
    authenticate('session', { multi: true }),
    prompt
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/state',
  'http://i.bixbyjs.org/http/middleware/session'
];
