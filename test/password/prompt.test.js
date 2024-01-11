/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../com/password/prompt');


describe('password/prompt', function() {
  
  it('should create handler', function() {
    var handler = factory();
    expect(handler).to.be.a('function');
  });
  
  describe('handler', function() {
  
    it('should redirect', function(done) {
      var handler = factory();
    
      chai.express.use(handler)
        .finish(function() {
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('/login/password');
          done();
        })
        .listen();
    }); // should redirect
  
    it('should redirect with username', function(done) {
      var handler = factory();
    
      chai.express.use(handler)
        .request(function(req, res) {
          res.locals = { username: 'jane' };
        })
        .finish(function() {
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('/login/password?username=jane');
          done();
        })
        .listen();
    }); // should redirect with username
  
  }); // handler
  
});
