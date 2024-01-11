/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../com/identifier/service');


describe('identifier/service', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/login/identifier');
  });
  
  it('should create service', function() {
    function promptHandler() {};
    function routeHandler() {};
  
    var service = factory(promptHandler, routeHandler);
    
    expect(service).to.be.a('function');
    expect(service.length).to.equal(3);
  });
  
});
