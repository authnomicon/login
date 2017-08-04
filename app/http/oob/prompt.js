exports = module.exports = function(csrfProtection) {
  var path = require('path');
  
  
  function prompt(req, res, next) {
    res.locals.state = req.query.state;
    res.locals.csrfToken = req.csrfToken();
    
    console.log(req.session);
    var view = path.join(__dirname, '../../../views/oob/prompt.ejs');
    console.log(view);
    
    //res.render('loginx');
    res.render(view);
  }
  
  
  return [
    csrfProtection(),
    prompt
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection'
];
