/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/http/login/ceremony/spawn');


describe('http/login/ceremony/spawn', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    
    describe('default behavior', function() {
      var response;
      
      before(function(done) {
        var handler = factory();
        
        chai.express.handler(handler)
          .end(function(res) {
            response = res;
            done();
          })
          .dispatch();
      });
      
      it('should redirect', function() {
        expect(response.statusCode).to.equal(302);
        expect(response.getHeader('Location')).to.equal('/login');
      });
      
    }); // default behavior
    
  }); // handler
  
});
