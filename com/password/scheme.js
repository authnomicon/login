var Strategy = require('passport-local');

/**
 * Password authentication scheme.
 *
 * This component provides an HTTP authentication scheme that authenticates a
 * user by verifying a username and password.
 *
 * This authentication scheme is intended to be used by sites making use of
 * HTML forms to present the end-user with an interface for logging in to the
 * site.
 *
 * @param {@authnomicon/credentials.PasswordStore} passwords - Storage mechanism
 *          used to access and persist password credentials.
 * @param {@authnomicon/core.Directory} passwords - Directory service used to
 *          access accounts and account-related information.
 * @returns {passport.Strategy}
 */
exports = module.exports = function(passwords, users) {
  
  return new Strategy(function(username, password, cb) {
    
    passwords.verify(username, password, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      
      if (typeof user == 'object') { return cb(null, user); }
      users.find(username, function(err, user) {
        if (err) { return cb(err); }
        return cb(null, user);
      });
    });
  });
};

exports['@require'] = [
  'module:@authnomicon/credentials.PasswordStore',
  'module:@authnomicon/core.Directory'
];
