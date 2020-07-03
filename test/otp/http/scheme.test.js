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
    expect(factory['@scheme']).to.equal('www-otp-2');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('verifying OTP', function() {
    var otps = new Object();
    otps.verify2 = sinon.stub().yieldsAsync(null, true);
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../../app/otp/http/scheme',
      { 'passport-otp': StrategySpy });
    var strategy = factory(otps);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('verify', function() {
      var ok, info;
      
      before(function(done) {
        var verify = StrategySpy.args[0][0];
        verify('123456', { id: '248289761001', displayName: 'Jane Doe' }, function(e, o, i) {
          if (e) { return done(e); }
          ok = o;
          info = i;
          done();
        });
      });
      
      it('should verify credentials', function() {
        expect(otps.verify2).to.calledOnceWith('123456', { id: '248289761001', displayName: 'Jane Doe' });
      });
      
      it('should yield ok', function() {
        expect(ok).to.be.true;
      });
      
      it('should yield info', function() {
        expect(info).to.deep.equal({
          methods: [ 'otp' ]
        });
      });
    }); // verify
    
  }); // verifying OTP
  
  /*
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
  */
  
});
