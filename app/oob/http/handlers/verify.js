exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  
  /*
        if (!req.user) {
          console.log('again...');
        
          res.locals.ticket = req.body.ticket || req.query.ticket;
        
          var view = path.join(__dirname, '../../../views/oob/prompt.ejs');
          res.render(view);
          return;
        }
  */
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('login/oob',
      csrfProtection(),
      authenticate('state'),
      authenticate('oob'),
      // TODO: re-prompt if authentication passed...
      function unauthorizedErrorHandler(err, req, res, next) {
        if (err.status !== 401) { return next(err); }
        
        req.state.failureCount = req.state.failureCount ? req.state.failureCount + 1 : 1;
        res.locals.failureCount = req.state.failureCount;
        res.prompt();
        // TODO: Have some maxAttempt limit
      },
    { through: 'login' })
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony',
];
