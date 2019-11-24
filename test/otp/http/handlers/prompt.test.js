/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var flowstate = require('flowstate');
var factory = require('../../../../app/otp/http/handlers/prompt');


describe('otp/http/handlers/prompt', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    var manager = new flowstate.Manager();
    manager.use('login/otp', {
      prompt:  [
        function(req, res, next) {
          res.render('login/otp');
        }
      ]
    });
    
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
    
    
    describe('prompting', function() {
      var request, response, view;
      
      before(function(done) {
        var handler = factory(csrfProtection, authenticate, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.query = {};
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
      
      it('should provide CSRF protection', function() {
        expect(request.csrfToken()).to.equal('xxxxxxxx');
      });
      
      /*
      it('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          method: 'session'
        });
      });
      */
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(response).to.render('login/otp');
      });
    }); // prompting
    
  }); // handler
  
});
