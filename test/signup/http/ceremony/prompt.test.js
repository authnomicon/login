/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/signup/http/ceremony/prompt');


describe('signup/http/ceremony/prompt', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    
    describe('default behavior', function() {
      var request, response, view;
      
      before(function(done) {
        var handler = factory();
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
          })
          .res(function(res) {
            response = res;
            res.locals = {};
          })
          .render(function(res, v) {
            view = v;
            done();
          })
          .dispatch();
      });
      
      it('should set locals', function() {
        expect(response.locals).to.deep.equal({});
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(view).to.equal('signup');
      });
    }); // default behavior
    
  }); // handler
  
});
