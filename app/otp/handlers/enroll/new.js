exports = module.exports = function(OTP, csrfProtection) {
  var path = require('path');
  
  function prompt(req, res, next) {
    res.locals.state = req.query.state;
    res.locals.csrfToken = req.csrfToken();
    
    console.log(req.session);
    //var view = path.join(__dirname, '../../../views/otp/prompt.ejs');
    //console.log(view);
    
    console.log('GENERATE NEW OTP!!!');
    
    OTP.generate('totp', function(err, out) {
      console.log('GENERATED!')
      console.log(err);
      console.log(out)
      
      if (err) { return cb(err); }
      
     
      
      //console.log(otpauthURL);
      
      var qr = 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + encodeURIComponent(out.barcodeURL);
      
      console.log(qr)
      
      res.locals.csrfToken = req.csrfToken();
      res.locals.barcodeURL = qr;
      
      console.log(req.session);
      var view = path.join(__dirname, '../../../../views/otp/enroll.ejs');
      console.log(view);
    
      //res.render('loginx');
      res.render(view);
      
    });
    
    //res.render('loginx');
    //res.render(view);
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
