exports = module.exports = {
  'oauth/statestore': require('./xom/oauth/statestore'),
  'oauth2/statestore': require('./xom/oauth2/statestore')
};

exports.load = function(id) {
  try {
    return require('./xom/' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
