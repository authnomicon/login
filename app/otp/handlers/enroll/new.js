exports = module.exports = function(OTP, csrfProtection) {
  var path = require('path');
  
  function generate(req, res, next) {
    var type = req.query.algorithm || 'totp';
    
    OTP.generate(type, function(err, authnr) {
      if (err) { return next(err); }
      
      var qr = 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + encodeURIComponent(authnr.barcodeURL);
      
      res.locals.barcodeURL = qr;
      next();
    });
  }
  
  function prompt(req, res, next) {
    res.locals.state = req.query.state;
    res.locals.csrfToken = req.csrfToken();
    
    var view = path.join(__dirname, '../../../../views/otp/enroll.ejs');
    res.render(view);
  }
  
  
  return [
    csrfProtection(),
    generate,
    prompt
  ];
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/security/authentication/otp',
  'http://i.bixbyjs.org/http/middleware/csrfProtection'
];
