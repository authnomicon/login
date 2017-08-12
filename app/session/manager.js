exports = module.exports = function(serializeUser, deserializeUser) {
  
  /*
  var SessionManager = require('../../lib/sessionmanager');
  
  var smgr = new SessionManager();
  smgr.serializeUser(serializeUser);
  smgr.deserializeUser(deserializeUser);
  
  return smgr;
  */
  
  
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
