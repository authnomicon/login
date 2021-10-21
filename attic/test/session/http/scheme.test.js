/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/session/http/scheme');
var Strategy = require('../../../lib/session/strategy');


describe('session/http/scheme', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/auth/Scheme');
    expect(factory['@scheme']).to.equal('session');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('deserializing user from session', function() {
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../../app/session/http/scheme',
      { '../../../lib/session/strategy': StrategySpy });
    var strategy = factory();
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('deserialize', function() {
      var user;
      
      before(function(done) {
        var deserialize = StrategySpy.args[0][0];
        deserialize({ id: '248289761001', displayName: 'Jane Doe' }, function(e, u) {
          if (e) { return done(e); }
          user = u;
          done();
        });
      });
      
      it('should yield user', function() {
        expect(user).to.deep.equal({
          id: '248289761001',
          displayName: 'Jane Doe'
        });
      });
    }); // deserialize
    
  }); // deserializing user from session
  
});
