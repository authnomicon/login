exports = module.exports = function(begin, resume) {
  
  return {
    begin: begin,
    resume: resume
  };
};

//exports['@implements'] = 'http://i.bixbyjs.org/http/flows/Task';
exports['@name'] = 'login';
exports['@require'] = [
  './task/begin',
  './task/resume'
];
