/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../../../../app/password/http/handlers/verify');


describe('password/http/handlers/verify', function() {
  
  var handler;

  before(function() {
    function parse(type) {
      return function(req, res, next) {
        next();
      };
    }
  
    function csrfProtection() {
      return function(req, res, next) {
        next();
      };
    }
  
    function authenticate(mechanism) {
      return function(req, res, next) {
        req.login = function(user, info, cb) {
          process.nextTick(function() {
            req.session.user = user;
            req.session.method = info.method;
            cb();
          });
        };
      
        req.user = { id: '248289761001', displayName: 'Jane Doe' };
        req.authInfo = { method: 'password' };
        next();
      };
    }
    
    function state() {
      return function(req, res, next) {
        next();
      };
    }
    
    var parseSpy = sinon.spy(parse);
    var csrfProtectionSpy = sinon.spy(csrfProtection);
    var authenticateSpy = sinon.spy(authenticate);
    var stateSpy = sinon.spy(state);
    
    handler = factory(parseSpy, csrfProtectionSpy, authenticateSpy, stateSpy);
    
    expect(parseSpy).to.be.calledOnceWith('application/x-www-form-urlencoded');
    expect(csrfProtectionSpy).to.be.calledOnce;
    expect(authenticateSpy).to.be.calledOnceWith('www-form/password');
    expect(stateSpy).to.be.calledOnce;
  });
  
  it('verifying username and password', function(done) {
    
    chai.express.use(handler)
      .request(function(req, res) {
        req.body = {
          username: 'jane',
          password: 'opensesame',
          csrf_token: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
        };
        req.session = {};
        
        res.resumeState = sinon.spy(function(cb) {
          process.nextTick(cb);
        });
      })
      .finish(function() {
        expect(this.req.session).to.deep.equal({
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          method: 'password'
        });
        
        expect(this.statusCode).to.equal(302);
        expect(this.getHeader('Location')).to.equal('/');
        
        done();
      })
      .listen();
      
  }); // authenticating username and password
  
});
