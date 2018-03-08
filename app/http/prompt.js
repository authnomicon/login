exports = module.exports = function(begin, resume) {
  
  return {
    begin: begin,
    resume: resume
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/state/Prompt';
exports['@name'] = 'login';
exports['@require'] = [
  './prompt/begin',
  './prompt/resume'
];
