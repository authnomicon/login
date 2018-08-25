/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/login/http/ceremony/resume');
var httpErrors = require('http-errors');


describe('http/login/ceremony/resume', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    
    describe.skip('handling an unauthorized error', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory();
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.state = {};
          })
          .res(function(res) {
            response = res;
            res.locals = {};
            
            res.prompt = function() {
              this.end();
            }
          })
          .end(function(res) {
            done();
          })
          .dispatch(new httpErrors.Unauthorized());
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          failureCount: 1
        });
      });
      
      it('should set locals', function() {
        expect(response.locals).to.deep.equal({
          message: 'Invalid username or password',
          failureCount: 1
        });
      });
      
      it('should prompt', function() {
        expect(response.statusCode).to.equal(200);
      });
    }); // handling an unauthorized error
    
  }); // handler
  
});
