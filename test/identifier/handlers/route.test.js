/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../com/identifier/handlers/route');


describe('identifier/handlers/route', function() {
  
  it('should create handler', function() {
    var bodyParserSpy = sinon.spy();
    var csurfSpy = sinon.spy();
    var flowstateSpy = sinon.spy();
    var factory = $require('../../../com/identifier/handlers/route', {
      'body-parser': { urlencoded: bodyParserSpy },
      'csurf': csurfSpy,
      'flowstate': flowstateSpy
    });
    
    var store = new Object();
    var handler = factory(undefined, undefined, store);
    
    expect(handler).to.be.an('array');
    expect(bodyParserSpy).to.be.calledOnce;
    expect(bodyParserSpy).to.be.calledBefore(csurfSpy);
    expect(bodyParserSpy).to.be.calledWith({ extended: false });
    expect(csurfSpy).to.be.calledOnce;
    expect(csurfSpy).to.be.calledBefore(flowstateSpy);
    expect(flowstateSpy).to.be.calledOnce;
    expect(flowstateSpy).to.be.calledWith({ store: store });
  });
  
  describe('handler', function() {
    var noopStateStore = new Object();
    
    
    it('should route to prompt', function(done) {
      var prompts = new Object();
      prompts.dispatch = sinon.spy(function(prompt, req, res, next) {
        res.redirect('/login/password');
      });
      var router = sinon.spy(function(identifier, cb) {
        process.nextTick(function() {
          cb(null, 'password');
        });
      });
      var handler = factory(prompts, router, noopStateStore);
      
      chai.express.use(handler)
        .request(function(req, res) {
          req.method = 'POST';
          req.body = {
            identifier: 'jane',
            csrf_token: '3aev7m03-1WTaAw4lJ_GWEMkjwFBu_lwNWG8'
          };
          req.session = {
            csrfSecret: 'zbVXAFVVUSXO0_ZZLBYVP9ue'
          };
          req.connection = {};
        })
        .finish(function() {
          expect(router).to.be.calledWith('jane');
          expect(prompts.dispatch).to.be.calledWith('password');
          
          expect(this.locals).to.deep.equal({});
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('/login/password');
          done();
        })
        .listen();
    }); // should route to prompt
    
    it('should route to prompt with options', function(done) {
      var prompts = new Object();
      prompts.dispatch = sinon.spy(function(prompt, req, res, next) {
        res.redirect('/login/password');
      });
      var router = sinon.spy(function(identifier, cb) {
        process.nextTick(function() {
          cb(null, 'password', { username: identifier });
        });
      });
      var handler = factory(prompts, router, noopStateStore);
      
      chai.express.use(handler)
        .request(function(req, res) {
          req.method = 'POST';
          req.body = {
            identifier: 'jane',
            csrf_token: '3aev7m03-1WTaAw4lJ_GWEMkjwFBu_lwNWG8'
          };
          req.session = {
            csrfSecret: 'zbVXAFVVUSXO0_ZZLBYVP9ue'
          };
          req.connection = {};
        })
        .finish(function() {
          expect(router).to.be.calledWith('jane');
          expect(prompts.dispatch).to.be.calledWith('password');
          
          expect(this.locals).to.deep.equal({ username: 'jane' });
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('/login/password');
          done();
        })
        .listen();
    }); // should route to prompt with options
    
  }); // handler
  
});
