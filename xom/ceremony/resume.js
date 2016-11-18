exports = module.exports = function(ceremony) {

  return [
    ceremony.complete('login'),
    ceremony.completeWithError('login')
  ];
  
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/ua/flows/Dispatcher'
];
