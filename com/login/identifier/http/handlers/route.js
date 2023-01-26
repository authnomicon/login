exports = module.exports = function(router, state) {
  
  function route(req, res, next) {
    router(req.body.identifier, res, next);
  }
  
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    state(),
    route
  ];
};

exports['@require'] = [
  '../router',
  'http://i.bixbyjs.org/http/middleware/state'
];
