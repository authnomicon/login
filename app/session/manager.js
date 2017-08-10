exports = module.exports = function(serializeUser, deserializeUser) {
  return {
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
  }
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/SessionManager';
exports['@singleton'] = true;
exports['@require'] = [
  './serializeuser',
  './deserializeuser'
];
