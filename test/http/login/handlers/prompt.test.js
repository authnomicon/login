/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/http/login/handlers/prompt');
var flowstate = require('flowstate');


describe('http/login/handlers/prompt', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    var manager = new flowstate.Manager();
    manager.use('login', {
      prompt:  [
        function(req, res, next) {
          res.render('login');
        }
      ]
    })
    
    function ceremony(name) {
      return manager.flow.apply(manager, arguments);
    }
    
    function csrfProtection() {
      return function(req, res, next) {
        res.locals.csrfToken = 'xxxxxxxx';
        next();
      };
    }
    
    function errorLogging() {
      return function(err, req, res, next) {
        next(err);
      };
    }
    
    
    
    describe('default behavior', function() {
      var request, response, view;
      
      before(function(done) {
        var handler = factory(csrfProtection, null, errorLogging, ceremony);
        
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
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          name: 'login'
        });
        expect(request.state.isComplete()).to.equal(false);
      });
      
      it('should set locals', function() {
        expect(response.locals).to.deep.equal({
          csrfToken: 'xxxxxxxx'
        });
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(view).to.equal('login');
      });
    }); // default behavior
    
  }); // handler
  
});
