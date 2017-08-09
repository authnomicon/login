exports = module.exports = function(parse, csrfProtection, loadState, authenticate, proceed) {
  
  // TODO: Move this file to "password/handlers/authenticate"
  
  return [
    parse('application/x-www-form-urlencoded'),
    csrfProtection(),
    loadState('login'),
    authenticate('local'),
    proceed
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/loadState',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  '../../activity/login/resume'
];
