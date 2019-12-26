/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/login/http/service');


describe('login/http/service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/login');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  it('should construct service', function() {
    function promptHandler() {};
    function initiateHandler() {};
  
    var service = factory(promptHandler, initiateHandler);
    
    expect(service).to.be.a('function');
    expect(service.length).to.equal(3);
  });
  
});
