/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var flowstate = require('flowstate');
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
    var manager = new flowstate.Manager();
    manager.use('login', {
      resume:  [
        function(req, res, next) {
          res.end();
        }
      ]
    })
    
    function ceremony(stack) {
      var stack = Array.prototype.slice.call(arguments, 0);
      
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
        req.csrfToken = function() {
          return 'xxxxxxxx';
        };
        
        next();
      };
    }
    
    function authenticate(method) {
      return function(req, res, next) {
        req.login = function(user, cb) {
          process.nextTick(function() {
            cb();
          });
        };
        
        req.authInfo = { method: method };
        next();
      };
    }
    
    
    describe('authenticating', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory(parse, csrfProtection, authenticate, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
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
      
      it('should provide CSRF protection', function() {
        expect(request.csrfToken()).to.equal('xxxxxxxx');
      });
      
      it('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          method: 'www-password'
        });
      });
      
      it('should resume', function() {
        expect(response.statusCode).to.equal(200);
      });
    }); // authenticating
    
  }); // handler
  
});
