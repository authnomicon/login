exports = module.exports = {
  'oauth/handle': require('./oauth/handle'),
  'oauth/statestore': require('./oauth/statestore'),
  'oidc/statestore': require('./oidc/statestore')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
