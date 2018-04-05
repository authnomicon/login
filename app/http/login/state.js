exports = module.exports = function(begin, resume, finish) {
  
  return {
    begin: begin,
    resume: resume,
    finish: finish
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/state/State';
exports['@name'] = 'login';
exports['@require'] = [
  './state/begin',
  './state/resume',
  './state/finish'
];
