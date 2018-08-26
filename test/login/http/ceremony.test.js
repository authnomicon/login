/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/login/http/ceremony');


describe('login/http/ceremony', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/ceremony/Prompt');
    expect(factory['@name']).to.equal('login');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('create', function() {
    function launchHandler() {};
    function promptHandler() {};
    function resumeHandler() {};
    function exitHandler() {};
    
    var ceremony = factory(launchHandler, promptHandler, resumeHandler, exitHandler);
  
    it('should construct ceremony', function() {
      expect(ceremony).to.be.an('object');
      expect(ceremony.launch).to.equal(launchHandler);
      expect(ceremony.prompt).to.equal(promptHandler);
      expect(ceremony.resume).to.equal(resumeHandler);
      expect(ceremony.exit).to.equal(exitHandler);
    });
  });
  
});
