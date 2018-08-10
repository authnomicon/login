exports = module.exports = function(ds, parse, ceremony) {
  
  
  function register(req, res, next) {
    console.log('REGISTER IT!');
    console.log(req.body)
    
    var user = {
      username: req.body.username,
      password: req.body.password
    }
    var realm = req.body.realm;
    
    ds.add(user, realm, function(err, user) {
      console.log('ADDED!');
      console.log(err);
      console.log(user);
    });
  }
  
  
  return [
    parse('application/x-www-form-urlencoded'),
    ceremony('signup',
      register
    )
  ];
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/ds/realms',
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
