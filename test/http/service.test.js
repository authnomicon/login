/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../com/http/service');


describe('http/service', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/');
  });
  
  it('should construct service', function() {
    function promptHandler() {};
    function logoutPromptHandler() {};
    function logoutActionHandler() {};
  
    var service = factory(promptHandler, logoutPromptHandler, logoutActionHandler);
    
    expect(service).to.be.a('function');
    expect(service.length).to.equal(3);
  });
  
});
