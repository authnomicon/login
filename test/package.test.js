/* global describe, it */

var expect = require('chai').expect;


describe('@authnomicon/login', function() {
  
  describe('package.json', function() {
    var json = require('../package.json');
    
    it('should have assembly metadata', function() {
      expect(json.assembly.namespace).to.equal('org.authnomicon/login');
      
      expect(json.assembly.components).to.have.length(8);
      expect(json.assembly.components).to.include('password/http/service');
      expect(json.assembly.components).to.include('password/http/scheme');
    });
  });
  
  it('should throw if required', function() {
    expect(function() {
      var pkg = require('..');
    }).to.throw(Error).with.property('code', 'MODULE_NOT_FOUND');
  });
  
});
