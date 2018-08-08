/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var flowstate = require('flowstate');
var factory = require('../../../../app/oob/http/handlers/prompt');


describe('oob/http/handlers/prompt', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    var authenticators = {
      list: function(){}
    };
    
    var oob = {
      challenge: function(){}
    };
    
    function csrfProtection() {
      return function(req, res, next) {
        req.csrfToken = function() {
          return 'xxxxxxxx';
        };
        
        next();
      };
    }
    
    
    describe('prompting', function() {
      var request, response, view;
      
      before(function() {
        sinon.stub(authenticators, 'list').yields(null, [ { id: '1', channel: 'test' }]);
        sinon.stub(oob, 'challenge').yields(null, { ticket: 't1ck3t' });
      });
    
      after(function() {
        authenticators.list.restore();
      });
      
      before(function(done) {
        var handler = factory(authenticators, oob, csrfProtection);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.query = {};
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
      
      it('should list authenticators', function() {
        expect(authenticators.list.callCount).to.equal(1);
        var call = authenticators.list.getCall(0)
        expect(call.args[0]).to.deep.equal({
          id: '1'
        });
      });
      
      it('should challenge authenticator', function() {
        expect(oob.challenge.callCount).to.equal(1);
        var call = oob.challenge.getCall(0)
        expect(call.args[0]).to.deep.equal({
          id: '1',
          channel: 'test'
        });
      });
      
      it.skip('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(view).to.equal('login');
      });
    });
    
  });
  
});
