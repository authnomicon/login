exports = module.exports = function() {
  var uri = require('url');

  // WIP
  function redirect(req, res, next) {
    console.log('FINISH: login');
    console.log(req.body)
    console.log(req.state);
    
    res.redirect('/home')
  }

  return [
    redirect
  ];
};

exports['@require'] = [];
