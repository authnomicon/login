exports = module.exports = function(promptHandler) {
  
  return {
    prompt: promptHandler
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'signup';
exports['@require'] = [
  './ceremony/prompt'
];
