/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../com/password/http/scheme');
var Strategy = require('passport-local');


describe('password/http/scheme', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/auth/Scheme');
    expect(factory['@scheme']).to.equal('www-form/password');
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('verifying username and password', function() {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(null, true);
    var users = new Object();
    users.find = sinon.stub().yieldsAsync(null, { id: '248289761001', displayName: 'Jane Doe' });
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../../com/password/http/scheme',
      { 'passport-local': StrategySpy });
    var strategy = factory(passwords, users);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('verify', function() {
      var user, info;
      
      before(function(done) {
        var verify = StrategySpy.args[0][0];
        verify('jane', 'opensesame', function(e, u, i) {
          if (e) { return done(e); }
          user = u;
          info = i;
          done();
        });
      });
      
      it('should verify credentials', function() {
        expect(passwords.verify).to.calledOnceWith('jane', 'opensesame');
      });
      
      it('should query directory', function() {
        expect(users.find).to.have.been.calledOnceWith('jane');
      });
      
      it('should yield user', function() {
        expect(user).to.deep.equal({
          id: '248289761001',
          displayName: 'Jane Doe'
        });
      });
      
      it('should yield info', function() {
        expect(info).to.be.undefined;
      });
    }); // verify
    
  }); // verifying username and password
  
  describe('verifying username and password using credential service with directory capability', function() {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(null, { id: '248289761001', displayName: 'Jane Doe' });
    var users = new Object();
    users.find = sinon.spy();
    
    var StrategySpy = sinon.spy(Strategy);
    
    var factory = $require('../../../com/password/http/scheme',
      { 'passport-local': StrategySpy });
    var strategy = factory(passwords, users);
    
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
    
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
    
    describe('verify', function() {
      var user, info;
      
      before(function(done) {
        var verify = StrategySpy.args[0][0];
        verify('jane', 'opensesame', function(e, u, i) {
          if (e) { return done(e); }
          user = u;
          info = i;
          done();
        });
      });
      
      it('should verify credentials', function() {
        expect(passwords.verify).to.calledOnceWith('jane', 'opensesame');
      });
      
      it('should not query directory', function() {
        expect(users.find).to.not.have.been.called;
      });
      
      it('should yield user', function() {
        expect(user).to.deep.equal({
          id: '248289761001',
          displayName: 'Jane Doe'
        });
      });
      
      it('should yield info', function() {
        expect(info).to.be.undefined;
      });
    }); // verify
    
  }); // verifying username and password using credential service with directory capability
  
  describe('not verifying username and password', function() {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(null, false);
    var users = new Object();
    users.find = sinon.stub().yieldsAsync(null, { id: '248289761001', displayName: 'Jane Doe' });
  
    var StrategySpy = sinon.spy(Strategy);
  
    var factory = $require('../../../com/password/http/scheme',
      { 'passport-local': StrategySpy });
    var strategy = factory(passwords, users);
  
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
  
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
  
    describe('verify', function() {
      var user, info;
    
      before(function(done) {
        var verify = StrategySpy.args[0][0];
        verify('jane', 'opensesame', function(e, u, i) {
          if (e) { return done(e); }
          user = u;
          info = i;
          done();
        });
      });
    
      it('should verify credentials', function() {
        expect(passwords.verify).to.calledOnceWith('jane', 'opensesame');
      });
    
      it('should not query directory', function() {
        expect(users.find).to.not.have.been.called;
      });
    
      it('should not yield user', function() {
        expect(user).to.equal(false);
      });
    
      it('should not yield info', function() {
        expect(info).to.be.undefined;
      });
    }); // verify
  
  }); // not verifying username and password
  
  describe('encountering error while verifying credentials', function() {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(new Error('something went wrong'));
    var users = new Object();
    users.find = sinon.stub().yieldsAsync(null, { id: '248289761001', displayName: 'Jane Doe' });
  
    var StrategySpy = sinon.spy(Strategy);
  
    var factory = $require('../../../com/password/http/scheme',
      { 'passport-local': StrategySpy });
    var strategy = factory(passwords, users);
  
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
  
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
  
    describe('verify', function() {
      var error, user, info;
    
      before(function(done) {
        var verify = StrategySpy.args[0][0];
        verify('jane', 'opensesame', function(e, u, i) {
          error = e;
          user = u;
          info = i;
          done();
        });
      });
    
      it('should verify credentials', function() {
        expect(passwords.verify).to.calledOnceWith('jane', 'opensesame');
      });
    
      it('should not query directory', function() {
        expect(users.find).to.not.have.been.called;
      });
      
      it('should yield error', function() {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('something went wrong');
      });
    
      it('should not yield user', function() {
        expect(user).to.be.undefined;
      });
    
      it('should not yield info', function() {
        expect(info).to.be.undefined;
      });
    }); // verify
  
  }); // encountering error while verifying credentials
  
  describe('encountering error while querying directory', function() {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(null, true);
    var users = new Object();
    users.find = sinon.stub().yieldsAsync(new Error('something went wrong'));
  
    var StrategySpy = sinon.spy(Strategy);
  
    var factory = $require('../../../com/password/http/scheme',
      { 'passport-local': StrategySpy });
    var strategy = factory(passwords, users);
  
    it('should construct strategy', function() {
      expect(StrategySpy).to.have.been.calledOnce;
    });
  
    it('should return strategy', function() {
      expect(strategy).to.be.an.instanceOf(Strategy);
    });
  
    describe('verify', function() {
      var error, user, info;
    
      before(function(done) {
        var verify = StrategySpy.args[0][0];
        verify('jane', 'opensesame', function(e, u, i) {
          error = e;
          user = u;
          info = i;
          done();
        });
      });
    
      it('should verify credentials', function() {
        expect(passwords.verify).to.calledOnceWith('jane', 'opensesame');
      });
    
      it('should query directory', function() {
        expect(users.find).to.have.been.calledOnceWith('jane');
      });
      
      it('should yield error', function() {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('something went wrong');
      });
    
      it('should not yield user', function() {
        expect(user).to.be.undefined;
      });
    
      it('should not yield info', function() {
        expect(info).to.be.undefined;
      });
    }); // verify
  
  }); // encountering error while querying directory
  
});
