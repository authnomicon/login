/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../com/identifier/handlers/prompt');


describe('identifier/handlers/prompt', function() {
  
  it('should create handler', function() {
    var csurfSpy = sinon.spy();
    var flowstateSpy = sinon.spy();
    var factory = $require('../../../com/identifier/handlers/prompt', {
      'csurf': csurfSpy,
      'flowstate': flowstateSpy
    });
    
    var store = new Object();
    var handler = factory(store);
    
    expect(handler).to.be.an('array');
    expect(csurfSpy).to.be.calledOnce;
    expect(csurfSpy).to.be.calledBefore(flowstateSpy);
    expect(flowstateSpy).to.be.calledOnce;
    expect(flowstateSpy).to.be.calledWith({ store: store });
  });
  
  describe('handler', function() {
  
    it('should render', function(done) {
      var store = new Object();
      var handler = factory(store);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.session = {};
          req.connection = {};
        })
        .finish(function() {
          expect(this).to.have.status(200);
          expect(this).to.render('login/identifier');
          expect(this).to.include.locals([ 'csrfToken' ]);
          done();
        })
        .listen();
    }); // should render
    
    it('should render with identifier', function(done) {
      var store = new Object();
      var handler = factory(store);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.query = { identifier: 'janedoe@example.com' };
          req.session = {};
          req.connection = {};
        })
        .finish(function() {
          expect(this).to.have.status(200);
          expect(this).to.render('login/identifier');
          expect(this).to.include.locals([ 'identifier', 'csrfToken' ]);
          expect(this.locals.identifier).to.equal('janedoe@example.com');
          done();
        })
        .listen();
    }); // should render with identifier
    
  }); // handler
  
});
