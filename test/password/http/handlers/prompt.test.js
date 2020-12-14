/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/password/http/handlers/prompt');


describe('password/http/handlers/prompt', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  describe('handler', function() {
    
    describe('challenging for username and password', function() {
      function csrfProtection() {
        return function(req, res, next) {
          req.csrfToken = function() {
            return 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql';
          };
        
          next();
        };
      }
      
      function state() {
        return function(req, res, next) {
          next();
        };
      }
      
      var csrfProtectionSpy = sinon.spy(csrfProtection);
      var stateSpy = sinon.spy(state);
      
      
      var request, response;
      
      before(function(done) {
        var handler = factory(csrfProtectionSpy, stateSpy);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
          })
          .res(function(res) {
            response = res;
            res.locals = {};
          })
          .end(function() {
            done();
          })
          .dispatch();
      });
      
      it('should setup middleware', function() {
        expect(stateSpy).to.be.calledOnce;
        expect(csrfProtectionSpy).to.be.calledOnce;
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(response).to.render('login/password');
        expect(response.locals).to.deep.equal({
          csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
        });
      });
    }); // challenging for username and password
    
  }); // handler
  
});
