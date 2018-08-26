/**
 * Login ceremony.
 */
exports = module.exports = function(launch, prompt, resume, exit) {
  
  return {
    launch: launch,
    prompt: prompt,
    resume: resume,
    exit: exit
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
