/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../com/login/password/http/scheme');
var Strategy = require('passport-local');


describe('password/http/scheme', function() {
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.be.undefined;
    expect(factory['@implements']).to.be.undefined;
  });
  
  it('should verify username and password', function(done) {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(null, true);
    var users = new Object();
    users.find = sinon.stub().yieldsAsync(null, { id: '248289761001', displayName: 'Jane Doe' });
    
    var StrategySpy = sinon.spy(Strategy);
    var factory = $require('../../../../com/login/password/http/scheme',
      { 'passport-local': StrategySpy });
    
    var scheme = factory(passwords, users);
    expect(StrategySpy).to.have.been.calledOnce;
    expect(scheme).to.be.an.instanceOf(Strategy);
    
    var verify = StrategySpy.args[0][0];
    verify('jane', 'opensesame', function(err, user, info) {
      if (err) { return done(err); }
          
      expect(passwords.verify).to.have.been.calledOnceWith('jane', 'opensesame');
      expect(users.find).to.have.been.calledOnceWith('jane');
      expect(user).to.deep.equal({
        id: '248289761001',
        displayName: 'Jane Doe'
      });
      expect(info).to.be.undefined;
      done();
    });
  }); // should verify username and password
  
  it('should verify username and password using credential store with directory capability', function(done) {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(null, { id: '248289761001', displayName: 'Jane Doe' });
    var users = new Object();
    users.find = sinon.spy();
    
    var StrategySpy = sinon.spy(Strategy);
    var factory = $require('../../../../com/login/password/http/scheme',
      { 'passport-local': StrategySpy });
      
    var scheme = factory(passwords, users);
    expect(StrategySpy).to.have.been.calledOnce;
    expect(scheme).to.be.an.instanceOf(Strategy);
    
    var verify = StrategySpy.args[0][0];
    verify('jane', 'opensesame', function(err, user, info) {
      if (err) { return done(err); }
      
      expect(passwords.verify).to.have.been.calledOnceWith('jane', 'opensesame');
      expect(users.find).to.not.have.been.called;
      expect(user).to.deep.equal({
        id: '248289761001',
        displayName: 'Jane Doe'
      });
      expect(info).to.be.undefined;
      done();
    });
  }); // should verify username and password using credential store with directory capability
  
  it('should not verify incorrect username and password', function(done) {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(null, false);
    var users = new Object();
    users.find = sinon.stub().yieldsAsync(null, { id: '248289761001', displayName: 'Jane Doe' });
  
    var StrategySpy = sinon.spy(Strategy);
    var factory = $require('../../../../com/login/password/http/scheme',
      { 'passport-local': StrategySpy });
      
    var scheme = factory(passwords, users);
    expect(StrategySpy).to.have.been.calledOnce;
    expect(scheme).to.be.an.instanceOf(Strategy);
  
    var verify = StrategySpy.args[0][0];
    verify('jane', 'opensesame', function(err, user, info) {
      if (err) { return done(err); }
      
      expect(passwords.verify).to.have.been.calledOnceWith('jane', 'opensesame');
      expect(users.find).to.not.have.been.called;
      expect(user).to.equal(false);
      expect(info).to.be.undefined;
      done();
    });
  }); // should not verify incorrect username and password
  
  it('should error when encountering and error while verifying credentials', function(done) {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(new Error('something went wrong'));
    var users = new Object();
    users.find = sinon.stub().yieldsAsync(null, { id: '248289761001', displayName: 'Jane Doe' });
  
    var StrategySpy = sinon.spy(Strategy);
    var factory = $require('../../../../com/login/password/http/scheme',
      { 'passport-local': StrategySpy });
      
    var scheme = factory(passwords, users);
    expect(StrategySpy).to.have.been.calledOnce;
    expect(scheme).to.be.an.instanceOf(Strategy);
    
    var verify = StrategySpy.args[0][0];
    verify('jane', 'opensesame', function(err, user, info) {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('something went wrong');
      
      expect(passwords.verify).to.have.been.calledOnceWith('jane', 'opensesame');
      expect(users.find).to.not.have.been.called;
      expect(user).to.be.undefined;
      expect(info).to.be.undefined;
      done();
    });
  }); // should error when encountering and error while verifying credentials
  
  it('should error when encountering error while querying directory', function(done) {
    var passwords = new Object();
    passwords.verify = sinon.stub().yieldsAsync(null, true);
    var users = new Object();
    users.find = sinon.stub().yieldsAsync(new Error('something went wrong'));
  
    var StrategySpy = sinon.spy(Strategy);
    var factory = $require('../../../../com/login/password/http/scheme',
      { 'passport-local': StrategySpy });
      
    var scheme = factory(passwords, users);
    expect(StrategySpy).to.have.been.calledOnce;
    expect(scheme).to.be.an.instanceOf(Strategy);
  
    var verify = StrategySpy.args[0][0];
    verify('jane', 'opensesame', function(err, user, info) {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('something went wrong');
      
      expect(passwords.verify).to.calledOnceWith('jane', 'opensesame');
      expect(users.find).to.have.been.calledOnceWith('jane');
      expect(user).to.be.undefined;
      expect(info).to.be.undefined;
      done();
    });
  }); //should error when encountering error while querying directory
  
});
