exports = module.exports = function(ceremony) {
  
  return ceremony('signup');
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
