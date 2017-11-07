exports = module.exports = function(OTP, csrfProtection) {
  var path = require('path');
  
  function prompt(req, res, next) {
    res.locals.state = req.query.state;
    res.locals.csrfToken = req.csrfToken();
    
    
    OTP.generate('totp', function(err, out) {
      if (err) { return cb(err); }
      
     
      var qr = 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + encodeURIComponent(out.barcodeURL);
      
      res.locals.csrfToken = req.csrfToken();
      res.locals.barcodeURL = qr;
      
      var view = path.join(__dirname, '../../../../views/otp/enroll.ejs');
      res.render(view);
    });
  }
  
  
  return [
    csrfProtection(),
    prompt
  ];
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/security/authentication/otp',
  'http://i.bixbyjs.org/http/middleware/csrfProtection'
];
