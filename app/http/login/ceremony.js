exports = module.exports = function(launch, resume, finish) {
  
  return {
    launch: launch,
    resume: resume,
    finish: finish
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'login';
exports['@require'] = [
  './ceremony/launch',
  './ceremony/resume',
  './ceremony/finish'
];
