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
          req.__ = req.__ || {};
          req.__.csrfToken = req.body.csrf_token;
          next();
        };
      }
    
      function authenticate(mechanism) {
        return function(req, res, next) {
          req.login = function(user, info, cb) {
            process.nextTick(function() {
              req.session.user = user;
              req.session.mechanism = info.mechanism;
              cb();
            });
          };
        
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          req.authInfo = { mechanism: mechanism };
          next();
        };
      }
      
      function state() {
        return function(req, res, next) {
          next();
        };
      }
      
      var parseSpy = sinon.spy(parse);
      var stateSpy = sinon.spy(state);
      
      
      var request, response;
      
      before(function(done) {
        var handler = factory(parseSpy, csrfProtection, authenticate, stateSpy);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            request.body = {
              username: 'jane',
              password: 'opensesame',
              csrf_token: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
            };
            request.session = {};
          })
          .res(function(res) {
            response = res;
            
            res.resumeState = sinon.spy(function(cb) {
              process.nextTick(cb);
            });
          })
          .end(function() {
            done();
          })
          .dispatch();
      });
      
      it('should setup middleware', function() {
        expect(parseSpy).to.be.calledOnceWith('application/x-www-form-urlencoded');
        expect(stateSpy).to.be.calledOnce;
      });
      
      it('should protect against CSRF', function() {
        expect(request.__.csrfToken).to.equal('i8XNjC4b8KVok4uw5RftR38Wgp2BFwql');
      });
      
      /*
      it('should authenticate', function() {
        expect(request.user).to.deep.equal({
          id: '248289761001',
          displayName: 'Jane Doe'
        });
        expect(request.authInfo).to.deep.equal({
          mechanism: 'x-www-password'
        });
      });
      */
      
      /*
      it('should establish session', function() {
        expect(request.session).to.deep.equal({
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          mechanism: 'x-www-password'
        });
      });
      */
      
      it('should respond', function() {
        expect(response.statusCode).to.equal(302);
        expect(response.getHeader('Location')).to.equal('/');
      });
    }); // authenticating username and password
    
  }); // handler
  
});
