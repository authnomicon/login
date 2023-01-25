/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../../../../com/signup/http/handlers/prompt');


describe('signup/http/handlers/prompt', function() {
  
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
    
    var stateSpy;
    
    stateSpy = sinon.spy(state);
    
    handler = factory(stateSpy);
    
    expect(stateSpy).to.be.calledOnce;
  });
  
  it('should prompt to create account', function(done) {
    
    chai.express.use(handler)
      .request(function(req, res) {
        req.session = {};
      })
      .finish(function() {
        expect(this).to.have.status(200);
        expect(this).to.render('account/signup');
        expect(this).to.include.locals([ 'csrfToken' ]);
        done();
      })
      .listen();
    
  }); // should prompt to create account
  
});
