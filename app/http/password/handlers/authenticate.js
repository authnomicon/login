exports = module.exports = function(parse, ceremony, csrfProtection, authenticate) {
  
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('authenticate-password',
      csrfProtection(),
      authenticate('password'),
    { through: 'login' })
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/ceremony',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate'
];
