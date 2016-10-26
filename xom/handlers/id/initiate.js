exports = module.exports = function(UIS) {
  
  function logIt(req, res, next) {
    console.log('INITIATE ID LOGIN');
    console.log(req.body);
    next();
  }
  
  // WebFinger:
  //   acct:paulej@packetizer.com
  // Hostmeta:
  //   acct:paulej@packetizer.com
  function resolve(req, res, next) {
    UIS.resolveServices(req.body.id, function(err, r) {
      console.log('GOT SERVICES:');
      console.log(err);
      console.log(r);
      
    });
  }
  
  
  return [
    logIt,
    resolve
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/uis'
];
