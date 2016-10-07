exports = module.exports = function(s) {
  var StateStore = require('../../lib/oauth/state/state');
  
  var store = new StateStore(s);
  return store;
};

exports['@implements'] = 'http://schema.authnomicon.org/js/aaa/login/oauth/StateStore';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/http/flows/StateStore'
];
