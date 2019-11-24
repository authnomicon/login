/* global describe, it, expect */

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var flowstate = require('flowstate');
var factory = require('../../../../app/oob/http/handlers/verify');


describe.skip('oob/http/handlers/verify', function() {
  
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
      resume:  [
        function(req, res, next) {
          res.end();
        }
      ]
    })
    manager.use('login/oob', {
      prompt:  [
        function(req, res, next) {
          res.statusCode = 302;
          res.end();
        }
      ]
    })
    
    function ceremony(name) {
      return manager.flow.apply(manager, arguments);
    }
    
    function parse(type) {
      return function(req, res, next) {
        req.__ = req.__ || {};
        req.__.supportedMediaType = type;
        next();
      };
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
        req.authInfo = req.authInfo || { methods: [] };
        req.authInfo.methods.push(method);
        req.authInfo.pending = false;
        next();
      };
    }
    
    
    describe.skip('authenticating', function() {
      var request, response;
      
      before(function(done) {
        var handler = factory(parse, csrfProtection, authenticate, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
          })
          .res(function(res) {
            response = res;
          })
          .end(function() {
            done();
          })
          .dispatch();
      });
      
      it('should parse request body', function() {
        expect(request.__.supportedMediaType).to.equal('application/x-www-form-urlencoded');
      });
      
      it('should provide CSRF protection', function() {
        expect(request.csrfToken()).to.equal('xxxxxxxx');
      });
      
      it('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          methods: [ 'state', 'oob' ],
          pending: false
        });
      });
      
      it('should set yieldState', function() {
        expect(request.yieldState).to.deep.equal({
          name: 'login/oob'
        });
        expect(request.yieldState.isComplete()).to.equal(true);
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          name: 'login'
        });
        expect(request.state.isComplete()).to.equal(false);
      });
      
      it('should resume', function() {
        expect(response.statusCode).to.equal(200);
      });
    }); // authenticating
    
    describe('re-prompting a pending challenge', function() {
      var request, response;
      
      function authenticate(method) {
        return function(req, res, next) {
          req.authInfo = req.authInfo || { methods: [] };
          req.authInfo.methods.push(method);
          next();
        };
      }
      
      before(function(done) {
        var handler = factory(parse, csrfProtection, authenticate, ceremony);
        
        chai.express.handler(handler)
          .req(function(req) {
            request = req;
          })
          .res(function(res) {
            response = res;
          })
          .end(function() {
            done();
          })
          .dispatch();
      });
      
      it('should parse request body', function() {
        expect(request.__.supportedMediaType).to.equal('application/x-www-form-urlencoded');
      });
      
      it('should provide CSRF protection', function() {
        expect(request.csrfToken()).to.equal('xxxxxxxx');
      });
      
      it('should authenticate', function() {
        expect(request.authInfo).to.deep.equal({
          methods: [ 'state', 'oob' ]
        });
      });
      
      it('should not set yieldState', function() {
        expect(request.yieldState).to.be.undefined;
      });
      
      it('should set state', function() {
        expect(request.state).to.deep.equal({
          name: 'login/oob'
        });
        expect(request.state.isComplete()).to.equal(false);
      });
      
      it('should prompt', function() {
        expect(response.statusCode).to.equal(302);
      });
    }); // re-prompting a pending challenge
    
  }); // handler
  
});
