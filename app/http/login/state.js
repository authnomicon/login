exports = module.exports = function(begin, resume, finish) {
  
  return {
    launch: begin,
    resume: resume,
    finish: finish
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'login';
exports['@require'] = [
  './state/begin',
  './state/resume',
  './state/finish'
];
