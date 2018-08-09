exports = module.exports = function(ceremony, errorLogging) {
  
  return [
    ceremony('signup'),
    errorLogging()
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/ceremony',
  'http://i.bixbyjs.org/http/middleware/errorLogging'
];
