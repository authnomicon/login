/* global describe, it */

var expect = require('chai').expect;


describe('@authnomicon/login', function() {
  
  describe('package.json', function() {
    var json = require('../package.json');
    
    it('should have assembly metadata', function() {
      expect(json.assembly.namespace).to.equal('org.authnomicon/login');
      expect(json.assembly.components).to.deep.equal([
        'locals/flowurl',
        'login/http/service',
        'login/http/prompt',
        'identifier/service',
        'password/prompt',
        'password/service',
        'session/select/http/service',
        'session/select/http/prompt',
        'signup/http/service'
      ]);
    });
  });
  
  it('should throw if required', function() {
    expect(function() {
      var pkg = require('..');
    }).to.throw(Error).with.property('code', 'MODULE_NOT_FOUND');
  });
  
});
