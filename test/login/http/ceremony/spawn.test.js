/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/login/http/ceremony/spawn');


describe('login/http/ceremony/spawn', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    
    describe('default behavior', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory();
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.state = {};
          })
          .end(function(res) {
            response = res;
            done();
          })
          .dispatch();
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          maxAttempts: 3
        });
      });
      
      it('should redirect', function() {
        expect(response.statusCode).to.equal(302);
        expect(response.getHeader('Location')).to.equal('/login');
      });
    }); // default behavior
    
    describe('spawning one-time password authentication', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory();
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.state = {};
            req.locals = { method: 'otp' };
          })
          .end(function(res) {
            response = res;
            done();
          })
          .dispatch();
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          maxAttempts: 3
        });
      });
      
      it('should redirect', function() {
        expect(response.statusCode).to.equal(302);
        expect(response.getHeader('Location')).to.equal('/login/otp');
      });
    }); // spawning one-time password authentication
    
    describe('spawning out-of-band authentication', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory();
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.state = {};
            req.locals = { method: 'oob' };
          })
          .end(function(res) {
            response = res;
            done();
          })
          .dispatch();
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          maxAttempts: 3
        });
      });
      
      it('should redirect', function() {
        expect(response.statusCode).to.equal(302);
        expect(response.getHeader('Location')).to.equal('/login/oob');
      });
    }); // spawning out-of-band authentication
    
  }); // handler
  
});
