/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/otp/http/handlers/verify');
var utils = require('../../../utils');


describe('otp/http/handlers/verify', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    
    function ceremony(stack) {
      var stack = Array.prototype.slice.call(arguments, 0);
      var options;
      if (typeof stack[stack.length - 1] == 'object' && !Array.isArray(stack[stack.length - 1])) {
        options = stack.pop();
      }
      
      return function(req, res, next) {
        utils.dispatch(stack)(null, req, res, next);
      };
    }
    
    function parse(type) {
      return function(req, res, next) {
        req.__ = req.__ || {};
        req.__.supportedMediaType = type;
        next();
      };
    }
    
    function csrfProtection() {
      return function(req, res, next) {
        req.__ = req.__ || {};
        req.__.csrfToken = req.body._csrf;
        next();
      };
    }
    
    function authenticate(method) {
      return function(req, res, next) {
        req.login = function(user, cb) {
          process.nextTick(function() {
            req.session.user = user;
            cb();
          });
        };
        
        req.user = { id: '248289761001', displayName: 'Jane Doe' };
        req.authInfo = req.authInfo || { methods: [] };
        req.authInfo.methods.push(method);
        next();
      };
    }
    
    
    describe('logging in with one-time password', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory(parse, csrfProtection, authenticate, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            request.body = { _csrf: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' };
            request.session = {};
          })
          .res(function(res) {
            response = res;
          })
          .next(function(err) {
            done(err);
          })
          .dispatch();
      });
      
      it('should parse request body', function() {
        expect(request.__.supportedMediaType).to.equal('application/x-www-form-urlencoded');
      });
      
      it('should protect against CSRF', function() {
        expect(request.__.csrfToken).to.equal('i8XNjC4b8KVok4uw5RftR38Wgp2BFwql');
      });
      
      it('should authenticate', function() {
        expect(request.user).to.deep.equal({
          id: '248289761001',
          displayName: 'Jane Doe'
        });
        expect(request.authInfo).to.deep.equal({
          methods: ['session', 'www-otp']
        });
      });
      
      it('should respond', function() {
        expect(response.statusCode).to.equal(200);
      });
    }); // logging in with one-time password
    
  });
  
});
