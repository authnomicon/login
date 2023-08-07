exports = module.exports = function(router, store) {
  
  function route(req, res, next) {
    router(req.body.identifier, res, next);
  }
  
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    route
    // TODO: add a default handler here which errors with "not routable" or to a default page
  ];
};

exports['@require'] = [
  'module:@authnomicon/login.IdentifierRouter',
  'module:flowstate.Store'
];
