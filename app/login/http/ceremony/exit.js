/**
 * Exit login ceremony.
 *
 * This component provides a middleware stack that exits a login ceremony.
 */
exports = module.exports = function() {
  
  function redirect(req, res, next) {
    res.redirect('/home')
  }
  
  
  return [
    redirect
  ];
};

exports['@require'] = [];
