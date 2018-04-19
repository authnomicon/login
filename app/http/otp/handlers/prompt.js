exports = module.exports = function(csrfProtection, ceremony) {
  
  return ceremony('login/otp',
    csrfProtection()
  );
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
