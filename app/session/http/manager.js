exports = module.exports = function(serializeUser, deserializeUser) {
  
  var SessionManager = require('../../../lib/session/manager');
  
  // TODO: Load app-specific plugins that clean up session data beyond login info (shopping cart, etc)
  
  var manager = new SessionManager(function(user, cb) {
    var obj = { id: user.id };
    if (user.username) { obj.username = user.username; }
    if (user.displayName) { obj.displayName = user.displayName; }
    if (user.name) { obj.name = user.name; }
    if (user.nickname) { obj.nickname = user.nickname; }
    // TODO: Reduce photos to single URL
    //if (user.photos) { obj.photos = user.photos; }
    return cb(null, obj);
  });
  return manager;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/SessionManager';
exports['@singleton'] = true;
exports['@require'] = [];
