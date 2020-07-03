/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/otp/http/handlers/prompt');
var utils = require('../../../utils');


describe('otp/http/handlers/prompt', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    
    function ceremony(stack) {
      var stack = Array.prototype.slice.call(arguments, 0);
      
      return function(req, res, next) {
        utils.dispatch(stack)(null, req, res, next);
      };
    }
    
    function csrfProtection() {
      return function(req, res, next) {
        req.csrfToken = function() {
          return 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql';
        };
        
        next();
      };
    }
    
    function authenticate(mechanism) {
      return function(req, res, next) {
        req.user = { id: '248289761001', displayName: 'Jane Doe' };
        req.authInfo = { mechanism: mechanism };
        next();
      };
    }
    
    
    describe('challenging for OTP', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory(csrfProtection, authenticate, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
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
      
      it('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          mechanism: 'session'
        });
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(response).to.render('stepup/otp');
        expect(response.locals).to.deep.equal({
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
        });
      });
    }); // challenging for OTP
    
  }); // handler
  
});
