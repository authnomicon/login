exports = module.exports = function(parse, csrfProtection, authenticate, ceremony) {
  
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('login/password',
      csrfProtection(),
      authenticate('password'),
    { through: 'login' })
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
