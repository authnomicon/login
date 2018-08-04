/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/http/password/service');


describe('http/password/service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal([
      'http://i.bixbyjs.org/http/Service',
      'http://schemas.authnomicon.org/js/login/password/HTTPService'
    ]);
    expect(factory['@path']).to.equal('/login/password');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('create', function() {
    function authenticateHandler() {};
    
    var service = factory(authenticateHandler);
  
    it('should construct handler', function() {
      expect(service).to.be.a('function');
      expect(service.length).to.equal(3);
    });
  });
  
});
