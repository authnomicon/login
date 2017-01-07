exports = module.exports = function(begin, resume) {
  
  return {
    begin: begin,
    resume: resume
  };
};

exports['@require'] = [
  './ceremony/begin',
  './ceremony/resume'
];
