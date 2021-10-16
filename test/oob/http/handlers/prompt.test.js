/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../../app/oob/http/handlers/prompt');
var utils = require('../../../utils');


describe('oob/http/handlers/prompt', function() {
  
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
    
    function authenticate(method) {
      return function(req, res, next) {
        req.user = { id: '248289761001', displayName: 'Jane Doe' };
        req.authInfo = { method: method };
        next();
      };
    }
    
    var OOBService = {
      challenge: function(){}
    };
    
    
    describe('prompting for out-of-band confirmation', function() {
      var request, response;
      
      before(function() {
        sinon.stub(OOBService, 'challenge').yields(null, '1c266114-a1be-4252-8ad1-04986c5b9ac1');
      });
      
      after(function() {
        OOBService.challenge.restore();
      });
      
      before(function(done) {
        var handler = factory(OOBService, csrfProtection, authenticate, ceremony);
        
        chai.express.use(handler)
          .request(function(req, res) {
            request = req;
            req.state = {};
            req.session = {};
            req.session.authInfo = { token: '8d67dc78-7faa-4d41-aabd-67707b374255' };
            
            response = res;
            res.locals = {};
          })
          .end(function() {
            done();
          })
          .listen();
      });
      
      it('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          method: 'session'
        });
      });
      
      it('should challenge authenticator', function() {
        expect(OOBService.challenge).to.have.been.calledWith(
          {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          { token: '8d67dc78-7faa-4d41-aabd-67707b374255' }
        );
      });
      
      it('should save state', function() {
        expect(request.state).to.deep.equal({
          ticket: '1c266114-a1be-4252-8ad1-04986c5b9ac1'
        });
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(response).to.render('login/oob');
        expect(response.locals).to.deep.equal({
          user: {
            id: '248289761001',
            displayName: 'Jane Doe'
          },
          csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
        });
      });
      
    }); // prompting for out-of-band confirmation
    
  }); // handler
  
});
