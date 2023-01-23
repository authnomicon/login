exports = module.exports = function(router, csrfProtection, state) {
  
  function route(req, res, next) {
    router(req.body.identifier, res, next);
  }
  
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    csrfProtection(),
    state(),
    route
  ];
};

exports['@require'] = [
  '../router',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/state'
];
