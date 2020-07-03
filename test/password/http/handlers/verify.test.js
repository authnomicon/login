/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/password/http/handlers/verify');
var utils = require('../../../utils');


describe('password/http/handlers/verify', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    
    function ceremony(stack) {
      var stack = Array.prototype.slice.call(arguments, 0)
        , options;
      if (typeof stack[stack.length - 1] == 'object' && !Array.isArray(stack[stack.length - 1])) {
        options = stack.pop();
      }
      
      stack.push(function(req, res, next) {
        res.redirect('/home');
      });
      
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
    
    
    describe('authenticating username and password', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory(parse, csrfProtection, authenticate, ceremony);
        
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
          })
          .end(function() {
            done();
          })
          .dispatch();
      });
      
      it('should parse media types', function() {
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
          mechanism: 'x-www-password'
        });
      });
      
      it('should establish session', function() {
        expect(request.session).to.deep.equal({
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          mechanism: 'x-www-password'
        });
      });
      
      it('should respond', function() {
        expect(response.statusCode).to.equal(302);
        expect(response.getHeader('Location')).to.equal('/home');
      });
    }); // authenticating username and password
    
  }); // handler
  
});
