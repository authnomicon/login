/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/password/http/handlers/prompt');


describe('password/http/handlers/prompt', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  describe('handler', function() {
    var test;
    
    function csrfProtection() {
      return function(req, res, next) {
        req.csrfToken = function() {
          return 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql';
        };
      
        next();
      };
    }
    
    function state() {
      return function(req, res, next) {
        next();
      };
    }
    
    var csrfProtectionSpy;
    var stateSpy;
    
    beforeEach(function() {
      csrfProtectionSpy = sinon.spy(csrfProtection);
      stateSpy = sinon.spy(state);
      
      var handler = factory(csrfProtectionSpy, stateSpy);
      
      expect(csrfProtectionSpy).to.be.calledOnce;
      expect(stateSpy).to.be.calledOnce;
      
      test = chai.express.handler(handler);
    });
    
    describe('challenging for username and password', function() {
      
      it('should render', function(done) {
        test
          .res(function(res) {
            res.locals = {};
          })
          .end(function() {
            expect(this).to.have.status(200);
            expect(this).to.render('login/password');
            // TODO: Express this as render.with.locals();
            expect(this.locals).to.deep.equal({
              csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
            });
            done();
          })
          .dispatch();
      });
      
    }); // challenging for username and password
    
  }); // handler
  
});
