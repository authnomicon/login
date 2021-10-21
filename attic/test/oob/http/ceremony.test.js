/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/oob/http/ceremony');


describe('oob/http/ceremony', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/ceremony/Prompt');
    expect(factory['@name']).to.equal('login/oob');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('create', function() {
    function promptHandler() {};
    
    var ceremony = factory(promptHandler);
  
    it('should construct ceremony', function() {
      expect(ceremony).to.be.an('object');
      expect(ceremony.prompt).to.equal(promptHandler);
    });
  });
  
});
