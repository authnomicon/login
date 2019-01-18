/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/oob/http/service');


describe('oob/http/service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/login/oob');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('create', function() {
    function promptHandler() {};
    function verifyHandler() {};
    
    var service = factory(promptHandler, verifyHandler);
  
    it('should construct handler', function() {
      expect(service).to.be.a('function');
      expect(service.length).to.equal(3);
    });
  });
  
});
