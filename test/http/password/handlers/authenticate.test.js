/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/http/password/handlers/authenticate');
var flowstate = require('flowstate');


describe('http/password/handlers/authenticate', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    function parse() {
      return function(req, res, next) {
        next();
      };
    }
    
    function csrfProtection() {
      return function(req, res, next) {
        next();
      };
    }
    
    function authenticate(method) {
      return function(req, res, next) {
        req.authInfo = { method: method };
        next();
      };
    }
    
    
    describe('default behavior', function() {
      var manager = new flowstate.Manager();
      manager.use('login', {
        resume:  [
          function(req, res, next) {
            res.end();
          }
        ]
      })
      
      function ceremony(name) {
        return manager.flow.apply(manager, arguments);
      }
      
      
      var request, response, view;
      var parseSpy;
      
      before(function(done) {
        parseSpy = sinon.spy(parse);
        
        var handler = factory(parseSpy, csrfProtection, authenticate, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
          })
          .res(function(res) {
            response = res;
          })
          .end(function() {
            done();
          })
          .dispatch();
      });
      
      it('should add parse middleware to stack', function() {
        expect(parseSpy.callCount).to.equal(1);
        expect(parseSpy).to.be.calledWithExactly('application/x-www-form-urlencoded');
      });
      
      it('should set yieldState', function() {
        expect(request.yieldState).to.deep.equal({
          name: 'login/password'
        });
        expect(request.yieldState.isComplete()).to.equal(true);
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          name: 'login'
        });
        expect(request.state.isComplete()).to.equal(false);
      });
      
      it('should set authentication info', function() {
        expect(request.authInfo).to.deep.equal({
          method: 'password'
        });
      });
      
      it('should end', function() {
        expect(response.statusCode).to.equal(200);
      });
    }); // default behavior
    
  }); // handler
  
});
