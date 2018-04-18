exports = module.exports = function(launch, resume, process, finish) {
  
  return {
    spawn: launch,
    resume: resume,
    process: process,
    finish: finish
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'login';
exports['@require'] = [
  './ceremony/launch',
  './ceremony/resume',
  './ceremony/process',
  './ceremony/finish'
];
