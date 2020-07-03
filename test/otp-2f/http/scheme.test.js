/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/otp-2f/http/scheme');
var Strategy = require('passport-otp');


describe('otp-2f/http/scheme', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/auth/Scheme');
    expect(factory['@scheme']).to.equal('x-www-otp-2f');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('verifying OTP', function() {
    var otps = new Object();
    otps.verify2 = sinon.stub().yieldsAsync(null, true);
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../../app/otp-2f/http/scheme',
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
  
  describe('not verifying OTP', function() {
    var otps = new Object();
    otps.verify2 = sinon.stub().yieldsAsync(null, false);
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../../app/otp-2f/http/scheme',
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
      
      it('should yield not ok', function() {
        expect(ok).to.be.false;
      });
      
      it('should not yield info', function() {
        expect(info).to.be.undefined;
      });
    }); // verify
    
  }); // not verifying OTP
  
  describe('encountering error while verifying OTP', function() {
    var otps = new Object();
    otps.verify2 = sinon.stub().yieldsAsync(new Error('something went wrong'));
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../../app/otp-2f/http/scheme',
      { 'passport-otp': StrategySpy });
    var strategy = factory(otps);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('verify', function() {
      var error, ok, info;
      
      before(function(done) {
        var verify = StrategySpy.args[0][0];
        verify('123456', { id: '248289761001', displayName: 'Jane Doe' }, function(e, o, i) {
          error = e;
          ok = o;
          info = i;
          done();
        });
      });
      
      it('should yield error', function() {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('something went wrong');
      });
      
      it('should not yield ok', function() {
        expect(ok).to.be.undefined;
      });
      
      it('should not yield info', function() {
        expect(info).to.be.undefined;
      });
    }); // verify
    
  }); // encountering error while verifying OTP
  
});
