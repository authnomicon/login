exports = module.exports = function() {
  
  function redirect(req, res, next) {
    res.redirect('/home')
  }
  
  
  return [
    redirect
  ];
};

exports['@require'] = [];
