/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/workflow/login/begin');


describe('workflow/login/begin', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  describe('handler', function() {
    
    describe('default behavior', function() {
      var response;
      
      before(function(done) {
        var handler = factory();
        
        chai.express.handler(handler)
          .end(function(res) {
            console.log('END!')
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
