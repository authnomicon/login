/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/login/http/handlers/prompt');
var utils = require('../../../utils');


describe('login/http/handlers/prompt', function() {
  
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
      
      return function(req, res, next) {
        utils.dispatch(stack)(null, req, res, next);
      };
    }
    
    function authenticate(method) {
      return function(req, res, next) {
        if (req.session && req.session.user) {
          req.user = req.session.user;
        }
        req.authInfo = { method: method };
        next();
      };
    }
    
    function errorLogging() {
      return function(err, req, res, next) {
        req.__ = req.__ || {};
        req.__.log = req.__.log || [];
        req.__.log.push(err.message);
        next(err);
      };
    }
    
    
    describe('challenging for password', function() {
      var request, response;
      
      before(function(done) {
        function loginHandler(req, res) {
          res.challenge('password');
        }
        
        var handler = factory(loginHandler, authenticate, errorLogging, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
          })
          .res(function(res) {
            response = res;
          })
          .end(function(res) {
            done();
          })
          .dispatch();
      });
      
      it('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          method: [ 'session', 'anonymous' ]
        });
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(302);
        expect(response.getHeader('Location')).to.equal('/login/password');
      });
    }); // challenging for password
    
  }); // handler
  
});
