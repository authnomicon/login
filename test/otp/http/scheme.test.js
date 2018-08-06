/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/otp/http/scheme');
var Strategy = require('passport-otp');


describe('otp/http/scheme', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/auth/Scheme');
    expect(factory['@scheme']).to.equal('otp');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('creating scheme', function() {
    var StrategySpy = sinon.spy(Strategy);
    var otp = { verify: function(){} };
    var fetch = function(){};
    
    var factory = $require('../../../app/otp/http/scheme',
      { 'passport-otp': StrategySpy });
    var strategy = factory(otp, fetch);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
      expect(StrategySpy).to.have.been.calledWithExactly({ passReqToCallback: true }, otp, fetch);
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
  }); // creating scheme
  
});
