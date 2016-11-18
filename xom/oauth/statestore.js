exports = module.exports = function(toHandle, s) {
  var StateStore = require('../../lib/oauth/state/state');
  
  var store = new StateStore(s, toHandle);
  return store;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/aaa/login/oauth/StateStore';
exports['@singleton'] = true;
exports['@require'] = [
  'http://schemas.authnomicon.org/js/aaa/login/oauth/getStateHandle',
  'http://i.bixbyjs.org/http/ua/flows/StateStore'
];
