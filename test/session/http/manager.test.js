/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/session/http/manager');
var Manager = require('../../../lib/session/manager');


describe('session/http/manager', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/auth/SessionManager');
    expect(factory['@singleton']).to.be.true;
  });
  
  describe('serializing user with id and display name', function() {
    var ManagerSpy = sinon.spy(Manager);
    
    var factory = $require('../../../app/session/http/manager',
      { '../../../lib/session/manager': ManagerSpy });
    var manager = factory();
    
    it('should construct manager', function() {
      expect(ManagerSpy).to.have.been.calledOnce;
    });
    
    it('should return manager', function() {
      expect(manager).to.be.an.instanceOf(Manager);
    });
    
    describe('serialize', function() {
      var obj;
      
      before(function(done) {
        var user = {
          id: '703887',
          displayName: 'Mork Hashimoto',
          birthday: "0000-01-16",
        }
        
        var serialize = ManagerSpy.args[0][0];
        serialize(user, function(e, o) {
          if (e) { return done(e); }
          obj = o;
          done();
        });
      });
      
      it('should yield object', function() {
        expect(obj).to.deep.equal({
          id: '703887',
          displayName: 'Mork Hashimoto'
        });
      });
    }); // serialize
    
  }); // serializing user with id and username
  
});
