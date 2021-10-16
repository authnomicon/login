/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/password/http/handlers/verify');


describe('password/http/handlers/verify', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    
    describe('verifying username and password', function() {
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
      
      
      var request, response;
      
      before(function(done) {
        var handler = factory(parseSpy, csrfProtectionSpy, authenticateSpy, stateSpy);
        
        chai.express.use(handler)
          .request(function(req, res) {
            request = req;
            request.body = {
              username: 'jane',
              password: 'opensesame',
              csrf_token: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
            };
            request.session = {};
            
            response = res;
            
            res.resumeState = sinon.spy(function(cb) {
              process.nextTick(cb);
            });
          })
          .end(function() {
            done();
          })
          .listen();
      });
      
      it('should setup middleware', function() {
        expect(parseSpy).to.be.calledOnceWith('application/x-www-form-urlencoded');
        expect(csrfProtectionSpy).to.be.calledOnce;
        expect(authenticateSpy).to.be.calledOnceWith('www-form/password');
        expect(stateSpy).to.be.calledOnce;
      });
      
      it('should establish session', function() {
        expect(request.session).to.deep.equal({
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          method: 'password'
        });
      });
      
      it('should respond', function() {
        expect(response.statusCode).to.equal(302);
        expect(response.getHeader('Location')).to.equal('/');
      });
    }); // authenticating username and password
    
  }); // handler
  
});
