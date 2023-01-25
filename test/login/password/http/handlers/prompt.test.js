/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var sinon = require('sinon');
var factory = require('../../../../../com/login/password/http/handlers/prompt');


describe('password/http/handlers/prompt', function() {
  
  var handler;
  
  before(function() {
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
  
  it('should prompt for username and password', function(done) {
    
    chai.express.use(handler)
      .request(function(req, res) {
        req.session = {};
      })
      .finish(function() {
        expect(this).to.have.status(200);
        expect(this).to.render('login/password');
        expect(this).to.include.locals([ 'csrfToken' ]);
        done();
      })
      .listen();
    
  }); // should prompt for username and password
  
});
