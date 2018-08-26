/**
 * Login ceremony.
 */
exports = module.exports = function(launchHandler, promptHandler, resumeHandler, exitHandler) {
  
  return {
    launch: launchHandler,
    prompt: promptHandler,
    resume: resumeHandler,
    exit: exitHandler
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'login';
exports['@require'] = [
  './ceremony/launch',
  './ceremony/prompt',
  './ceremony/resume',
  './ceremony/exit'
];
