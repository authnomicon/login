exports = module.exports = function(parse, csrfProtection, state) {
  
  function route(req, res, next) {
    console.log('ROUTE');
    console.log(req.body);
  }
  
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    state(),
    route
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/state'
];
