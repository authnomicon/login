/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../com/handlers/prompt');


describe('handlers/prompt', function() {
  
  it('should create handler', function() {
    var csurfSpy = sinon.spy();
    var flowstateSpy = sinon.spy();
    var factory = $require('../../com/handlers/prompt', {
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
          expect(this).to.render('login');
          expect(this).to.include.locals([ 'csrfToken' ]);
          done();
        })
        .listen();
    }); // should render
    
    it('should redirect to identifier-first prompt if supported', function(done) {
      var store = new Object();
      var container = new Object();
      container.create = sinon.stub().withArgs('module:@authnomicon/login.IdentifierRouter').resolves();
      
      var handler = factory(store, container);
    
      chai.express.use(handler)
        .request(function(req, res) {
          res.render = sinon.spy(function(view, cb) {
            process.nextTick(function() {
              var err = new Error('Failed to lookup view "login" in views directory');
              err.view = {
                name: 'login'
              };
              return cb(err);
            });
          });
          
          req.session = {};
          req.connection = {};
        })
        .finish(function() {
          // FIXME: If these assertions fail, the test hangs.
          expect(container.create).to.be.calledOnceWith('module:@authnomicon/login.IdentifierRouter');
          
          expect(this).to.have.status(302);
          expect(this.getHeader('Location')).to.equal('/login/identifier');
          done();
        })
        .listen();
    }); // should redirect to identifier-first prompt if supported
    
    it('should next with error when identifier router cannot be created', function(done) {
      var store = new Object();
      var container = new Object();
      var failIdentifierRouterErr = new Error("Unable to create component 'app/foo' required by 'app/identifierrouter'");
      failIdentifierRouterErr.code = 'IMPLEMENTATION_NOT_FOUND';
      failIdentifierRouterErr.interface = 'app/foo';
      container.create = sinon.stub().withArgs('module:@authnomicon/login.IdentifierRouter').rejects(failIdentifierRouterErr);
      
      var handler = factory(store, container);
    
      chai.express.use(handler)
        .request(function(req, res) {
          res.render = sinon.spy(function(view, cb) {
            process.nextTick(function() {
              var err = new Error('Failed to lookup view "login" in views directory');
              err.view = {
                name: 'login'
              };
              return cb(err);
            });
          });
          
          req.session = {};
          req.connection = {};
        })
        .next(function(err) {
          expect(container.create).to.be.calledOnceWith('module:@authnomicon/login.IdentifierRouter');
          
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.equal("Unable to create component 'app/foo' required by 'app/identifierrouter'");
          done();
        })
        .listen();
    }); // should next with error when identifier router cannot be created
    
    it('should redirect to password challenge if supported', function(done) {
      var store = new Object();
      var container = new Object();
      var noIdentifierRouterErr = new Error("Cannot find implementation of 'module:@authnomicon/login.IdentifierRouter' required by 'org.authnomicon/login/handlers/prompt'");
      noIdentifierRouterErr.code = 'IMPLEMENTATION_NOT_FOUND';
      noIdentifierRouterErr.interface = 'module:@authnomicon/login.IdentifierRouter';
      container.create = sinon.stub()
      container.create.withArgs('module:@authnomicon/login.IdentifierRouter').rejects(noIdentifierRouterErr);
      container.create.withArgs('module:@authnomicon/credentials.PasswordStore').resolves();
      
      var handler = factory(store, container);
    
      chai.express.use(handler)
        .request(function(req, res) {
          res.render = sinon.spy(function(view, cb) {
            process.nextTick(function() {
              var err = new Error('Failed to lookup view "login" in views directory');
              err.view = {
                name: 'login'
              };
              return cb(err);
            });
          });
          
          req.session = {};
          req.connection = {};
        })
        .finish(function() {
          // FIXME: If these assertions fail, the test hangs.
          expect(container.create).to.be.calledTwice;
          expect(container.create.getCall(0)).to.be.calledWith('module:@authnomicon/login.IdentifierRouter');
          expect(container.create.getCall(1)).to.be.calledWith('module:@authnomicon/credentials.PasswordStore');
          
          expect(this).to.have.status(302);
          expect(this.getHeader('Location')).to.equal('/login/password');
          done();
        })
        .listen();
    }); // should redirect to password challenge if supported
    
    it('should next with prompt error if all methods are unsupported', function(done) {
      var store = new Object();
      var container = new Object();
      var noIdentifierRouterErr = new Error("Cannot find implementation of 'module:@authnomicon/login.IdentifierRouter' required by 'org.authnomicon/login/handlers/prompt'");
      noIdentifierRouterErr.code = 'IMPLEMENTATION_NOT_FOUND';
      noIdentifierRouterErr.interface = 'module:@authnomicon/login.IdentifierRouter';
      container.create = sinon.stub()
      container.create.withArgs('module:@authnomicon/login.IdentifierRouter').rejects(noIdentifierRouterErr);
      var noPasswordStoreErr = new Error("Cannot find implementation of 'module:@authnomicon/credentials.PasswordStore' required by 'org.authnomicon/login/handlers/prompt'");
      noPasswordStoreErr.code = 'IMPLEMENTATION_NOT_FOUND';
      noPasswordStoreErr.interface = 'module:@authnomicon/credentials.PasswordStore';
      container.create.withArgs('module:@authnomicon/credentials.PasswordStore').rejects(noPasswordStoreErr);
      
      var handler = factory(store, container);
    
      chai.express.use(handler)
        .request(function(req, res) {
          res.render = sinon.spy(function(view, cb) {
            process.nextTick(function() {
              var err = new Error('Failed to lookup view "login" in views directory');
              err.view = {
                name: 'login'
              };
              return cb(err);
            });
          });
          
          req.session = {};
          req.connection = {};
        })
        .next(function(err) {
          expect(container.create).to.be.calledTwice;
          expect(container.create.getCall(0)).to.be.calledWith('module:@authnomicon/login.IdentifierRouter');
          expect(container.create.getCall(1)).to.be.calledWith('module:@authnomicon/credentials.PasswordStore');
          
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.equal('Failed to lookup view "login" in views directory');
          done();
        })
        .listen();
    }); // should next with prompt error if all methods are unsupported
    
  }); // handler
  
});
