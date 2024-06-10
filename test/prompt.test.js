/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../com/prompt');


describe('prompt', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('module:@authnomicon/prompts.RequestHandler');
    expect(factory['@name']).to.equal('login');
  });
  
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
          expect(this.getHeader('Location')).to.equal('/login');
          done();
        })
        .listen();
    }); // should redirect
    
    it('should redirect with login hint', function(done) {
      var handler = factory();
    
      chai.express.use(handler)
        .request(function(req, res) {
          res.locals = { loginHint: 'janedoe@example.com' };
        })
        .finish(function() {
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('/login?login_hint=janedoe%40example.com');
          done();
        })
        .listen();
    }); // should redirect with login hint
  
  }); // handler
  
});
