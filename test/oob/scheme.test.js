/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/password/scheme');
var Strategy = require('passport-oob');


describe('oob/scheme', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/auth/Scheme');
  });
  
  describe('creating scheme', function() {
    var StrategySpy = sinon.spy(Strategy);
    var gateway = { verify: function(){} };
    var fetch = function(){};
    
    var factory = $require('../../app/oob/scheme',
      { 'passport-oob': StrategySpy });
    var strategy = factory(gateway, fetch);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
      expect(StrategySpy).to.have.been.calledWithExactly({ passReqToCallback: true }, gateway, fetch);
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
  }); // creating scheme
  
});
