exports = module.exports = function(s) {
  var StateStore = require('../../lib/oidc/state/state');
  
  var store = new StateStore(s);
  return store;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/aaa/login/oidc/StateStore';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/http/ua/flows/StateStore'
];
