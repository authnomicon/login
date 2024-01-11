/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../com/password/service');


describe('password/http/service', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/login/password');
  });
  
  it('should create service', function() {
    function promptHandler() {};
    function verifyHandler() {};
  
    var service = factory(promptHandler, verifyHandler);
    
    expect(service).to.be.a('function');
    expect(service.length).to.equal(3);
  });
  
});
