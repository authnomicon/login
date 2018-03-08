exports = module.exports = function(parse, flow, csrfProtection, authenticate) {
  
  return [
    parse('application/x-www-form-urlencoded'),
    flow('authenticate-password',
      csrfProtection(),
      authenticate('password'),
    { through: 'login' })
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/state/flow',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate'
];
