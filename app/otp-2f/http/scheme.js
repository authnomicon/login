exports = module.exports = function(otps) {
  var Strategy = require('passport-otp');
  
  return new Strategy(function(otp, user, cb) {
    
    otps.verify2(otp, user, function(err, ok, info) {
      if (err) { return cb(err); }
      if (!ok) { return cb(null, false); }
      
      info = info || {};
      info.methods = [ 'otp' ];
      return cb(null, ok, info);
    });
  });
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'www-otp-2f';
exports['@require'] = [
  'http://i.authnomicon.org/credentials/OTPService'
];
