exports = module.exports = function(router, store) {
  
  function route(req, res, next) {
    router(req.body.identifier, res, next);
  }
  
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    route
  ];
};

exports['@require'] = [
  '../router',
  'module:flowstate.Store'
];
