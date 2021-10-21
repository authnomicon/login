exports = module.exports = function(router, parse, csrfProtection, state) {
  
  function route(req, res, next) {
    router(req.body.identifier, res, next);
  }
  
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    state(),
    route
  ];
};

exports['@require'] = [
  '../router',
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/state'
];
