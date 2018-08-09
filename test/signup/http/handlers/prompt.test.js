/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var flowstate = require('flowstate');
var factory = require('../../../../app/signup/http/handlers/prompt');


describe('signup/http/handlers/prompt', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    var manager = new flowstate.Manager();
    manager.use('signup', {
      prompt:  [
        function(req, res, next) {
          res.render('signup');
        }
      ]
    });
    
    function ceremony(name) {
      return manager.flow.apply(manager, arguments);
    }
    
    
    describe('prompting', function() {
      var request, response, view;
      
      before(function(done) {
        var handler = factory(ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
          })
          .res(function(res) {
            response = res;
          })
          .render(function(res, v) {
            view = v;
            done();
          })
          .dispatch();
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(view).to.equal('signup');
      });
    });
    
  });
  
});
