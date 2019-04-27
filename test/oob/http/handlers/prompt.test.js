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
    var manager = new flowstate.Manager();
    manager.use('login/oob', {
      prompt:  [
        function(req, res, next) {
          res.render('login/oob');
        }
      ]
    });
    
    function ceremony(name) {
      return manager.flow.apply(manager, arguments);
    }
    
    var credentials = {
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
    
    function authenticate(method) {
      return function(req, res, next) {
        req.authInfo = { method: method };
        next();
      };
    }
    
    
    describe('prompting', function() {
      var request, response, view;
      
      before(function() {
        sinon.stub(credentials, 'list').yields(null, [ { id: '1', channel: 'test' } ]);
        sinon.stub(oob, 'challenge').yields(null, 't1ck3t');
      });
    
      after(function() {
        oob.challenge.restore();
        credentials.list.restore();
      });
      
      before(function(done) {
        var handler = factory(credentials, oob, csrfProtection, authenticate, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
            req.user = { id: '501' };
            req.query = {};
            req.state = {};
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
      
      it('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          method: 'session'
        });
      });
      
      it('should list credentials', function() {
        expect(credentials.list.callCount).to.equal(1);
        var call = credentials.list.getCall(0)
        expect(call.args[0]).to.deep.equal({
          id: '501'
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
      
      it('should set locals', function() {
        expect(response.locals).to.deep.equal({
          credentials: [ {
            id: '1',
            channel: 'test',
          } ]
        });
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          user: { id: '501' },
          credential: { id: '1' },
          ticket: 't1ck3t'
        });
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(response).to.render('login/oob');
      });
    }); // prompting
    
  }); // handler
  
});
