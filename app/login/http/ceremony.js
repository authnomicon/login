/**
 * Login ceremony.
 */
exports = module.exports = function(spawn, prompt, resume, exit) {
  
  return {
    spawn: spawn,
    prompt: prompt,
    resume: resume,
    exit: exit
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'login';
exports['@require'] = [
  './ceremony/spawn',
  './ceremony/prompt',
  './ceremony/resume',
  './ceremony/exit'
];
