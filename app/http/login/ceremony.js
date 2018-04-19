exports = module.exports = function(launch, resume, process, finish) {
  
  return {
    spawn: launch,
    resume: resume,
    prompt: process,
    exit: finish
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'login';
exports['@require'] = [
  './ceremony/spawn',
  './ceremony/resume',
  './ceremony/prompt',
  './ceremony/finish'
];
