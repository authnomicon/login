/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../../../app/http/handlers/prompt');


describe('http/handlers/prompt', function() {
  
  var handler;
  
  before(function() {
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
    
    csrfProtectionSpy = sinon.spy(csrfProtection);
    stateSpy = sinon.spy(state);
    
    handler = factory(csrfProtectionSpy, stateSpy);
    
    expect(csrfProtectionSpy).to.be.calledOnce;
    expect(stateSpy).to.be.calledOnce;
  });
  
  it('should prompt for username and password', function(done) {
    
    chai.express.use(handler)
      .finish(function() {
        expect(this).to.have.status(200);
        expect(this).to.render('login').with.deep.locals({
          csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
        });
        done();
      })
      .listen();
    
  }); // should prompt for username and password
  
});
