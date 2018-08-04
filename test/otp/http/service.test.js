/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/otp/http/service');


describe('otp/http/service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal([
      'http://i.bixbyjs.org/http/Service',
      'http://schemas.authnomicon.org/js/http/login/OTPService'
    ]);
    expect(factory['@path']).to.equal('/login/otp');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('create', function() {
    function promptHandler() {};
    function authenticateHandler() {};
    
    var service = factory(promptHandler, authenticateHandler);
  
    it('should construct handler', function() {
      expect(service).to.be.a('function');
      expect(service.length).to.equal(3);
    });
  });
  
});
