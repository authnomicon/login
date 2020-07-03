/**
 * Password authentication scheme.
 *
 * This component provides an HTTP authentication scheme that authenticates an
 * end-user using a username and password.
 *
 * This authentication scheme is intended to be used by sites making use of
 * HTML forms to present the end-user with an interface for logging in to the
 * site.
 */
exports = module.exports = function(passwords, users) {
  var Strategy = require('passport-local');
  
  return new Strategy(function(username, password, cb) {
    
    passwords.verify(username, password, function(err, user, info) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      
      info = info || {};
      info.methods = [ 'password' ];
      
      if (typeof user == 'object') { return cb(null, user, info); }
      users.find(username, function(err, user) {
        if (err) { return cb(err); }
        return cb(null, user, info);
      });
    });
  });
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'x-www-password';
exports['@require'] = [
  'http://i.authnomicon.org/credentials/PasswordService',
  'http://i.authnomicon.org/directory/UserDirectory'
];
