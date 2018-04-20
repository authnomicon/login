exports = module.exports = function(spawn, resume, prompt, exit) {
  
  return {
    spawn: spawn,
    resume: resume,
    prompt: prompt,
    exit: exit
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'login';
exports['@require'] = [
  './ceremony/spawn',
  './ceremony/resume',
  './ceremony/prompt',
  './ceremony/exit'
];
