/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var flowstate = require('flowstate');
var factory = require('../../../../app/login/http/handlers/prompt');


describe.skip('login/http/handlers/prompt', function() {
  
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
        req.csrfToken = function() {
          return 'xxxxxxxx';
        };
        
        next();
      };
    }
    
    function authenticate(method) {
      return function(req, res, next) {
        req.authInfo = { method: method };
        next();
      };
    }
    
    function errorLogging() {
      return function(err, req, res, next) {
        req.__ = req.__ || {};
        req.__.log = req.__.log || [];
        req.__.log.push(err.message);
        next(err);
      };
    }
    
    
    
    describe('prompting', function() {
      var request, response, view;
      
      before(function(done) {
        var handler = factory(csrfProtection, authenticate, errorLogging, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
          })
          .res(function(res) {
            response = res;
          })
          .end(function(res) {
            done();
          })
          .dispatch();
      });
      
      it('should provide CSRF protection', function() {
        expect(request.csrfToken()).to.equal('xxxxxxxx');
      });
      
      it.skip('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          method: [ 'anonymous' ]
        });
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          name: 'login'
        });
        expect(request.state.isComplete()).to.equal(false);
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(response).to.render('login');
      });
    }); // prompting
    
  }); // handler
  
});
