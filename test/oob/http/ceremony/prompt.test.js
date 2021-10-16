/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/oob/http/ceremony/prompt');


describe('oob/http/ceremony/prompt', function() {
  
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
        
        chai.express.use(handler)
          .request(function(req, res) {
            request = req;
            req.csrfToken = function() {
              return 'xxxxxxxx';
            }
            
            response = res;
            res.locals = {};
          })
          .finish(function() {
            done();
          })
          .listen();
      });
      
      it('should set locals', function() {
        expect(response.locals).to.deep.equal({
          csrfToken: 'xxxxxxxx'
        });
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(response).to.render('login/oob');
      });
    }); // default behavior
    
  }); // handler
  
});
