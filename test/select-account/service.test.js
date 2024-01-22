/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../com/select-account/service');


describe('select-account/service', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/login/select-account');
  });
  
  it('should create service', function() {
    function promptHandler() {};
    function selectHandler() {};
  
    var service = factory(promptHandler, selectHandler);
    
    expect(service).to.be.a('function');
    expect(service.length).to.equal(3);
  });
  
});
